import mongoose from "mongoose";
import { ObjectId } from mongoose.Schema;

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: [2, "must be atleast 2 charcters"],
        maxlength: [32, "must be atleast 2 charcters"],
    },
    slug: {
        type: String,
        unique: true,
        lowercase: true,
    },
    parent: {
        type: ObjectId,
        ref: "Category",
        required: true,
    },
}
    
    );

const SubCategory = mongoose.models.SubCategory || mongoose.model('SubCategory', SubSchema);

export default SubCategory;
