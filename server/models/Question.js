import mongoose from 'mongoose'

const QuesionSchema = mongoose.Schema({
    questionTitle: {type: String, required: "Question must have a Title"},
    questionBody: {type: String, required: "Question must have a Body"},
    questionTags: {type: [String], required: "Question must have Tags"},
    noOfAnswers: {type: Number, default: 0},
    upVote: {type: [String], default: []},
    downVote: {type: [String], default: []},
    userPosted: {type: String, required: "Question must have an auther"},
    userId: {type: String},
    askedOn: { type: Date, default: Date.now},
    answer: [{
        answerBody: String,
        userAnswered: String,
        userId: String,
        answeredOn: {type: Date, default: Date.now}
    }]
})

export default mongoose.model("Question", QuesionSchema)