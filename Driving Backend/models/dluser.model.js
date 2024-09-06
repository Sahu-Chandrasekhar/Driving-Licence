const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const dlSchema = new Schema(
    {
        Adhaar: {
            type: Number,
        },
        Pan: {
            type: String,
        },
        Dl: {
            type: String,
            enum: ['2 Wheeler','3 Wheeler','LMV', '2 Wheeler & lmv', '2 & 3 Wheeler'],
            default: '2 Wheeler'
        },
        Status: {
            type: String,
            enum: ['Pending','Approved','Rejected'],
            default: 'Pending'
        },    
    },
    {
        timestamps: true,
    }
);

const DlUser = model("DLUser", dlSchema);
module.exports = DlUser;