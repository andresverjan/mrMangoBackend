const RequestObs = require("../../models/requestObs");
const Request = require("../../models/request");

module.exports = {
    createObservation: async (args) => {
        try {
            const observation = args.observation,
                newObservation = await RequestObs.create({
                    ...observation,
                });

            await Request.findOneAndUpdate(
                { _id: observation.requestId },
                {
                    $push: { observations: newObservation._id },
                }
            );
            return newObservation;
        } catch (error) {
            throw error;
        }
    },
};
