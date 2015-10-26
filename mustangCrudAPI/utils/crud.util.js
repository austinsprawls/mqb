'use strict';
/*Start imported npm modules*/
var _ = require('lodash');
/*End imported npm modules*/
//TODO better docs
module.exports = crudUtil();

function crudUtil(){
  /*Start exported variables*/
  /*End exported variables*/

  //Exported object
  var exported = {
    index: {
      child: indexChild,
      parent: indexParent
    },
    show: show,
    create: {
      child: createChild,
      parent: createParent
    },
    update: update,
    destroy: {
      child: destroyChild,
      parent: destroyParent
    }
  };
  function indexParent(){}
  function destroyParent(){}
  /*Start local variables for moduleNameCtrl*/
  /*End local variables for moduleNameCtrl*/

  /*Start exported functions*/
  /**
   * @name indexChild
   * @description
   *   Exported function used by GET requests to retrieve all
   *   database entries for a child given their parent id
   * @param indexData = {
     *     parentModel: '',    Mongoose model for child
     *     parentID: ''   id of the parent
     *     parentKey: ''   name of the key to assign the child id to
     *     res: ''    http response object
     * }
   * @returns
   *   200 - JSONArray of additionalDrivers, empty array if no drivers present
   *   404 - No quote matching quoteID was found
   *   500 - An error occurred finding the driver
   */
  function indexChild(indexData){
    /*Start local variables*/
    var parentModel = indexData.parentModel,
      parentID = indexData.parentID,
      parentKey = indexData.parentKey,
      res = indexData.res;
    /*End local variables*/

    parentModel.findById(parentID)
      .select(parentKey)
      .populate(parentKey)
      .exec(handleResult);

    function handleResult(err, result){
      if(err) return handleError(res, err);
      if(!result) return res.send(404);
      return res.status(200).json(result[parentKey]);
    }
  }

  /**
   * @name show
   * @description
   *   Exported function used by GET requests to retrieve a
   *   single database entry
   * @param showData = {
     *     model: '',   Mongoose model
     *     id: '',    id of targeted db entry
     *     res: '',    http response object
     * }
   * @returns
   *   200 - JSON Object of the found db entry
   *   404 - The db entry could not be found
   *   500 - An error occurred finding the db entry
   */
  function show(showData){
    /*Start local variables*/
    var model = showData.model,
      id = showData.id,
      res = showData.res;
    /*End local variables*/

    model.findById(id)
      .exec(handleFind);

    function handleFind(err, result){
      if(err) return handleError(res, err);
      if(!result) return res.json(404);
      return res.status(200).json(result);
    }
  }

  /**
   * @name createChild
   * @description
   *   Exported function used by POST requests to create a db entry
   *   and update the parent context
   * @param createData = {
     *     childInfo: '',   information used to create child db entry
     *     childModel: '',    Mongoose model for child
     *     parentModel: '',    Mongoose model for parent
     *     parentID: ''   id of the parent
     *     parentKey: ''   name of the key to assign the child id to
     *     isArray: '' is the child info held in an array? is it a 'many child' relationship
     *     res: ''    http response object
     *     callback: ''     OPTIONAL function to handle parent and child after creation, and updating
     * }                    !!!!!!!! This function should accept (err, childeResultObj, parentResultObj) and MUST return the response !!!!!!!!
   * @returns
   *   201 - Created context
   *   500 - An error occurred when creating the child entry or updating parent entry
   *   customCallback - If present the sent callback function will be returned
   */
  function createChild(createData){
    /*Start local variables*/
    var childInfo = createData.childInfo,
      childModel = createData.childModel,
      parentModel = createData.parentModel,
      parentID = createData.parentID,
      parentKey = createData.parentKey,
      isArray = createData.isArray,
      res = createData.res,
      customCallback = createData.callback;
    /*End local variables*/

    childModel.create(childInfo, handleCreation);

    function handleCreation(err, creationResult){
      if(err) return handleError(res, err);
      /*Start local variables*/
      var selectStr = parentKey,
        populateStr = parentKey,
        parentUpdateParams = {};
      /*End local variables*/

      //If the child id is contained in the parent in an array, the $push option is applied
      if (isArray){
        var pushParams = _.zipObject([parentKey], [creationResult._id]);
        parentUpdateParams =  _.zipObject(['$push'], [pushParams]);
      } else {
        parentUpdateParams = _.zipObject([parentKey], [creationResult._id]);
      }

      parentModel.findByIdAndUpdate(parentID, parentUpdateParams)
        .select(selectStr)
        .populate(populateStr)
        .exec(handleParentUpdate);

      function handleParentUpdate(err, updateResult){
        if(customCallback) return customCallback(err, creationResult, updateResult);
        if(err) return handleError(res, err);

        var returnedChild = {};

        if(isArray){ //TODO get this working for more robust saving.
          //Finds child result in parent array to ensure the data saved matches
          returnedChild = updateResult[parentKey].filter(function(value){
            return value._id.toString()==creationResult._id.toString()
          })[0];
        }  else {
          returnedChild = updateResult[parentKey];
        }
        console.log(returnedChild);
        return res.status(201).json(creationResult);
      }
    }
  }

  /**
   * @name createParent
   * @description
   *   Exported function used by POST requests to create a db entry
   *   for all default child relationships and correctly applies their id
   *   to the parent context
   * @param createData = {
     *     defaultRelationships: '',   JSONArray of default relationships containing fieldName and model key, value pairs
     *     parent: '',   mongoose parent object
     *     childKey: ''   name of the child key to assign the parent id
     *     res: ''    http response object
     * }
   * @param res
   * @returns
   *   201 - Created quote and all relationships
   *   500 - An error occurred when creating the quote or one of its relationships
   */
  function createParent(createData){
    /*Start local variables*/
    var defaultRelationships = createData.defaultRelationships,
      parent = createData.parent,
      childKey = createData.childKey,
      res = createData.res;
    /*End local variables*/

    createDefaultChildRelationships(parent, childKey, defaultRelationships).then(function(parentArr){
      var parent = parentArr[parentArr.length-1]; //TODO find more robust way to pull out quote

      parent.save(handleSave);
      function handleSave(err, savedParent){
        if(err) return handleError(res, err);
        return res.status(201).json(savedParent);
      }
    });
  }

  /**
   * @name update
   * @description
   *   Exported function used by GET requests to retrieve a
   *   database entry
   * @param req
   *   req.params.quoteID - quoteID assigned by clutch
   *   req.params.id - payment id assigned by clutch
   * @param showData = {
     *     model: '',   Mongoose model
     *     info: '',    Mongoose model for child
     *     id: '',    id of targeted db entry
     *     res: '',    http response object
     *     containsArray:  is there an array type in the context
     *     arrayKeys: names of the keys that have array values
     * }
   * @returns
   *   200 - Updated context
   *   500 - An error occurred updating the entry
   *   customCallback - If present the sent callback function will be returned
   *                    !!!!!!!! This function should accept (err, result) and MUST return the response !!!!!!!!
   */
  function update(updateData){
    /*Start local variables*/
    var model = updateData.model,
      info = updateData.info,
      id = updateData.id,
      res = updateData.res,
      customCallback = updateData.callback,
      containsArray = updateData.containsArray,
      arrayKeys = updateData.arrayKeys;
    /*End local variables*/

    var customUpdateOptions= {}; //Currently only used when arrays are present to push all array fields and values to the context
    if(info._id) delete info._id; //We don't ever want to overwrite the mongo _id



    //If the model contains an array type field we add the $addToSet option to customUpdateOptions
    //then adds each array to the addToSet option and delete the array from the info
    //If all arrays are currently null, the $addToSet key is deleted
    if(containsArray){
      customUpdateOptions['$set'] = {};
      arrayKeys.forEach(function(key){
        if(info[key]){
          customUpdateOptions['$set'][key] = info[key];
          delete info[key];
        }
      });
      if(_.isEmpty(customUpdateOptions['$set'])) delete customUpdateOptions['$set'];
    }

    //Forms complete update parameters
    var updateOptions = _.merge(customUpdateOptions, info);
    model.findByIdAndUpdate(id, updateOptions, handleUpdate);
    function handleUpdate(err, updateResult){
      if(customCallback) return customCallback(err, updateResult);
      if(err) return handleError(res, err);
      return res.status(200).json(updateResult);
    }
  }

  /**
   * !!!!!!!!!ONLY USED BY MANY TO ONE RELATIONS!!!!!!!!!
   *
   * @name destroyChild
   * @description
   *   Exported function used by DELETE requests to delete
   *   a child, and remove its reference from the parent
   * @param destroyData
   *     childModel: '',    Mongoose model for child
   *     childID: '',   information used to create child db entry
   *     parentModel: '',    Mongoose model for child
   *     parentID: ''   id of the parent
   *     parentKey: ''   name of the key to assign the child id to
   *     res: ''    http response object
   * }
   * @returns
   *   204 - Successful deletion
   *   500 - An error occurred deleting the entry
   *
   * !!!!!!!!!ONLY USED BY MANY TO ONE RELATIONS!!!!!!!!!
   */
  function destroyChild(destroyData){
    /*Start local variables*/
    var childModel = destroyData.childModel,
      childID = destroyData.childID,
      parentModel = destroyData.parentModel,
      parentID = destroyData.parentID,
      parentKey = destroyData.parentKey,
      res = destroyData.res;
    /*End local variables*/

    childModel.findByIdAndRemove(childID, handleRemoval);

    function handleRemoval(err){
      if(err) handleError(res, err);
      var pullOptions = {};
      pullOptions[parentKey] = childID;
      var updateOptions = {
        $pullAll: pullOptions
      };

      parentModel.findByIdAndUpdate(parentID, updateOptions, handleUpdate);

      function handleUpdate(){
        if(err) handleError(res, err);
        return res.send(204);
      }

    }
  }
  /*End exported functions*/

  /*Start local functions*/
  /**
   * @name createDefaultRelationships
   * @description
   *   creates the corresponding relationships passed in the object
   * @param parent
   * @param childKey
   * @param defaultRelationshipObjs
   * @returns Promise
   */
  function createDefaultChildRelationships(parent, childKey, defaultRelationshipObjs){
    var promiseArr = [],
      parent = parent,
      parentID = parent._id,
      childKey = childKey;

    var relationshipCases = {
      'one': setOneToOneRelation,
      'many': setOneToManyRelation
    };

    defaultRelationshipObjs.forEach(function(relationshipObj){
      var deferred = Q.defer();
      var createOptions = _.zipObject([childKey], [parentID]);

      relationshipObj.model.create(createOptions, function(err, result){
        if(err) return handleError(res, err);
        relationshipCases[result.relationship](parent, relationshipObj, result);
        deferred.resolve(parent);
      });
      promiseArr.push(deferred.promise);
    });
    return Q.all(promiseArr);
  }

  function setOneToOneRelation(parent, child, result){
    parent[child.name] = result._id
  }

  function setOneToManyRelation(parent, child, result){
    parent[child.name].push(result._id);
  }

  function handleError(res, err) {
    return res.send(500, err);
  }
  /*End local functions*/

  return exported;
}
