const Request = require("../../newArchitecture/models2/requests2");
const RequestObs = require("../../models/requestObs");

module.exports = {
    requests: async (args) => {
        try {
            const requestList = Request.find().populate({path: 'observations', populate: 'observations'});

            return requestList;
        } catch (error) {
            throw error;
        }
    },
    getMyRequest: async (args) => {
        try {
            const { userId } = args,
            requestList = await Request.find({ userId });

            return requestList;
        } catch (error) {
            throw error;
        }
    },

    getDetailByRequestId: async (args) => {
        try {
            const { requestId }= args;
            request = await Request.findOne({ _id: requestId });
            
            return request.details;
        } catch (error) {
            throw error;
        }
    },

    createRequest2: async (args) => {
        try {
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
    createObservation: async (args) => {
        try {
            const observation = args.observation,
            newObservation = await RequestObs.create({
                ...observation
            });

            await Request.findOneAndUpdate({_id: observation.requestId},{
                $push: {observations: newObservation._id}
            });

            return newObservation;
        } catch (error) {
           throw error; 
        }
    }
};
