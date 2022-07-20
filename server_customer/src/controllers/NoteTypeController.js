import moment from "moment";
import NoteType from "../models/notetype.js";

const NoteTypeController = {
  getAllNoteType: async (req, res) => {
    try {
      const noteTypes = await NoteType.findAll({
        order: [["created_at", "DESC"]],
      });

      if (!noteTypes) {
        return res
          .status(400)
          .json({ msg: "Some error occurred while retrieving noteTypes" });
      }

      res.status(200).json({ status: "success", note_types: noteTypes });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  getNoteTypeById: async (req, res) => {
    const id = req.params.id;
    try {
      const noteTypes = await NoteType.findOne({ where: { note_type_id: id } });

      if (!noteTypes) {
        return res
          .status(400)
          .json({
            msg: "Some error occurred while retrieving noteTypes by NoteTypeID = ",
            id,
          });
      }

      res.status(200).json({ status: "success", note_types: noteTypes });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  createNoteType: async (req, res) => {
    const { description, name } = req.body;
    console.log(req.body)
    try {
      const noteTypes = await NoteType.create({
        description: description,
        name: name,
        created_at: moment().format("YYYY/MM/DD, hh:mm:ss"),
      });

      if (!noteTypes) {
        return res
          .status(400)
          .json({ msg: "Some error occurred while creating noteTypes" });
      }

      res.status(200).json({ status: "success", note_types: noteTypes });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  updateNoteType: async (req, res) => {
    const id = req.params.id;
    const { description, name } = req.body;
    try {
      const noteTypes = await NoteType.update(
        {
          description: description,
          name: name,
        },
        { where: { note_type_id: id } }
      );

      if (!noteTypes) {
        return res
          .status(400)
          .json({
            msg: "Some error occurred while updating noteTypes with NoteTypeID = ",
            id,
          });
      }

      res.status(200).json({ status: "success", note_types: noteTypes });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  deleteNoteType: async (req, res) => {
    const id = req.params.id;
    try {
      const noteTypes = await NoteType.destroy({ where: { note_type_id: id } });

      if (!noteTypes) {
        return res
          .status(400)
          .json({
            msg: "Some error occurred while deleting noteTypes with NoteTypeID = ",
            id,
          });
      }

      res.status(200).json({ status: "success", noteTypes: noteTypes });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
};

export default NoteTypeController;
