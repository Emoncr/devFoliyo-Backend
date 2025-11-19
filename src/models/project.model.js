import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    shortDescription: { type: String, required: true },
    longDescription: { type: String, required: true },
    tags: { type: [String], required: true },
    coverImage: { type: String, required: true },
    sampleImages: { type: [String], required: true },
    previewLink: { type: String, required: false },
    projectDate: { type: String, required: true },
    techStack: { type: [Object], required: true },
    isFeatured: { type: Boolean, required: true },
    isHighlighted: { type: Boolean, required: true },
    categories: { type: [String], required: true },
    projectType: { type: String, required: true },
    githubLink: { type: String, required: false },
    client: { type: String, required: false },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model('Project', projectSchema);
