const Request = require("../../models/request");
const RequestObs = require("../../models/requestObs");

module.exports = {
  requests: async (args) => {
    try {
      const requestList = Request.find()
        .populate({ path: "details.subproducto", model: "subproducts" })
        .populate({ path: "details.additions.addition" });
      //.populate({path: 'details', populate:  { path: 'additions', populate:  { path: 'addition' }   }});
      return requestList;
    } catch (error) {
      throw error;
    }
  },

  getDetailByRequestId: async (args) => {
    try {
      const { requestId } = args;
      request = await Request.findOne({ _id: requestId }).populate({
        path: "observations",
        populate: "oservations",
      });

      return request;
    } catch (error) {
      throw error;
    }
  },

  getMyRequest: async (args) => {
    try {
      const { userId } = args,
        requestList = await Request.find({ userId })
          .populate({ path: "details.subproducto", model: "subproducts" })
          .populate({ path: "details.additions.addition" });
      return requestList;
    } catch (error) {
      throw error;
    }
  },

  createRequest: async (args) => {
    try {
      //const currentDate =  helpers.getCurrentDateTime();
      const requestInfo = args.request,
        request = await Request.create({
          ...requestInfo,
          status: 1,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        });
      return request;
    } catch (error) {
      throw error;
    }
  },

  updateRequest: async (args) => {
    try {
      const {
        _id,
        requestId,
        productoId,
        subproductoId,
        userId,
        latlng,
      } = args.request;
      const request = new Request({
        _id,
        requestId,
        productoId,
        subproductoId,
        userId,
        latlng,
        updatedAt: new Date().toISOString(),
      });
      const newRequest = await Request.findOneAndUpdate(request._id, request);
      if (!newRequest) {
        throw new Error("Request not found");
      }
      return { ...newRequest._doc, _id: newRequest.id };
    } catch (error) {
      throw error;
    }
  },
  acceptRequest: async (args) => {
    try {
      const { _id } = args.request;
      console.log("\n\nEL ID!!!!:", _id);
      const request = new Request({
        _id: _id,
        updatedAt: new Date().toISOString(),
        status: 2,
      });
      console.log("ANTES DE ACTUALIZARRRR!!", request);
      const newRequest = await Request.findOneAndUpdate(
        { _id: { $eq: request._id } },
        { $set: request },
        { new: true, upsert: true }
      );
      console.log("DESPUES DE ACTUALIZAR", newRequest);

      const newReq = await newRequest.save();
      console.log("ANTES DE GUARDAR: ", newReq);
      const res = await Request.updateOne(
        { _id: request._id },
        {
          $push: { observations: newReq._id },
        }
      );
      if (!newRequest) {
        throw new Error("Request not found");
      }
      return { ...newRequest._doc, _id: newRequest._id };
    } catch (error) {
      throw error;
    }
  },
  cancelRequest: async (args) => {
    try {
      const { _id, observations } = args.request;
      const request = new Request({
        _id: _id,
        updatedAt: new Date().toISOString(),
        status: 4,
      });
      console.log("QUE VIENE AQUÍ: ", _id);
      console.log("Y QUE ES LO QUE VIENE AQUÍ: ", observations.requestId);
      const newRequest = await Request.findOneAndUpdate(
        { _id: { $eq: request._id } },
        { $set: request },
        { new: true, upsert: true }
      );
      console.log("Actualizó correctamente: ", newRequest);
      const requestObs = new RequestObs({
        requestId: request._id,
        createdAt: new Date().toISOString(),
        status: 4,
        observation: observations,
      });
      console.log("Observaciones que vienen en el request", observations);
      const newReqObs = await requestObs.save();
      console.log("Nuevo requestObs: ", newReqObs);
      const res = await Request.updateOne(
        { _id: request._id },
        {
          $push: { observations: newReqObs._id },
        }
      );

      console.log("Respuesta del update: ", res);

      if (!newRequest) {
        throw new Error("Request not found");
      }

      return { ...newRequest._doc, _id: newRequest._id };
    } catch (error) {
      throw error;
    }
  },

  deleteRequest: async (args) => {
    try {
      const { _id } = args.request;
      console.log(args);
      const request = new Request({
        _id: _id,
      });
      const newRequest = await request.deleteOne(request._id);
      return { ...newRequest._doc, _id: newRequest.id };
    } catch (error) {
      throw error;
    }
  },
};
