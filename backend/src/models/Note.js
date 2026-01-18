import mongoose from "mongoose";

//Create 1. Schema (how data is structured)
//Create 2. Model based of that schema (variable that holds the schema(data))

const noteSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
}, {
    timestamps: true,
}
);

const Note = mongoose.model("Note", noteSchema);

export default Note;