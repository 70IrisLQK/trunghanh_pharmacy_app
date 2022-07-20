import Note from "../models/note.js";
import Pharmacy from "../models/pharmacy.js";
import NoteType from "../models/notetype.js";
import User from "../models/user.js";
import path from "path";
import { fileURLToPath } from "url";
import cloudinary from "cloudinary";
import moment from "moment";
import uuid from "uuid";
import { LOGGER } from "../logs/index.js";
import { uploadToCloudinary } from "../utils/UploadImage.js";

const DIR = "C:/Users/ryuk2/Documents/trunghanhpharma/server_customer/images";
const NoteController = {
  getAllNote: async (req, res) =>
  {
    const where = {};
    const { user_id } = req.query;

    if (user_id)
    {
      where.user_id = { [Sequelize.Op.like]: `%${user_id}%` };
    }

    try
    {
      const notes = await Note.findAll({
        where,
        order: [["created_at", "DESC"]],
        include: [{ model: Pharmacy }, { model: NoteType }, { model: User }],
      });

      if (!notes)
      {
        return res
          .status(400)
          .json({ msg: "Some error occurred while retrieving notes" });
      }

      res.status(200).json({ status: "success", notes: notes });
    } catch (error)
    {
      return res.status(500).json({ msg: error.message });
    }
  },
  getNoteById: async (req, res) =>
  {
    const id = req.params.id;
    try
    {
      const notes = await Note.findAll({ where: { note_id: id } });

      if (!notes)
      {
        return res.status(400).json({
          msg: "Some error occurred while retrieving notes by NoteID = ",
          id,
        });
      }

      res.status(200).json({ status: "success", notes: notes });
    } catch (error)
    {
      return res.status(500).json({ msg: error.message });
    }
  },

  createNote: async (req, res) =>
  {
    const { description, reply_note, user_id, note_type_id, pharmacy_id } =
      req.body;
    var file = req.files;

    let i = 0;
    let length = file.length;
    let fileNames = [];

    while (i < length)
    {
      var localFilePath = req.files[i].path;

      var result = await uploadToCloudinary(localFilePath);
      fileNames.push(result.url);

      i++;
    }
    try
    {
      const notes = await Note.create({
        description: description,
        reply_note: reply_note,
        user_id: user_id,
        note_type_id: note_type_id,
        pharmacy_id: pharmacy_id,
        image: fileNames,
        created_at: moment().format("YYYY/MM/DD, hh:mm:ss"),
      });

      if (!notes)
      {
        return res
          .status(400)
          .json({ msg: "Some error occurred while creating notes" });
      }

      res.status(200).json({ status: "success", notes: notes });
    } catch (error)
    {
      console.log(error.message)
      return res.status(500).json({ msg: error.message });
    }
  },

  createAdminNote: async (req, res) =>
  {
    const { description, pharmacyName, saleName, noteType, reply } = req.body;
    var file = req.files;

    let i = 0;
    let length = file.length;
    let fileNames = [];

    while (i < length)
    {
      var localFilePath = req.files[i].path;

      var result = await uploadToCloudinary(localFilePath);
      fileNames.push(result.url);

      i++;
    }
    try
    {
      const notes = await Note.create({
        description: description,
        reply_note: reply,
        user_id: saleName,
        note_type_id: noteType,
        pharmacy_id: pharmacyName,
        image: fileNames,
        created_at: moment().format("YYYY-MM-DD, hh:mm:ss"),
      });

      if (!notes)
      {
        return res
          .status(400)
          .json({ msg: "Some error occurred while creating notes" });
      }

      res.status(200).json({ status: "success", notes: notes });
    } catch (error)
    {
      console.log(error.message);
      return res.status(500).json({ msg: error.message });
    }
  },

  updateAdminNote: async (req, res) =>
  {
    const { description, pharmacyName, saleName, noteType, reply, note_id } =
      req.body;
    var file = req.files;

    let i = 0;
    let length = file.length;
    let fileNames = [];

    while (i < length)
    {
      var localFilePath = req.files[i].path;

      var result = await uploadToCloudinary(localFilePath);
      fileNames.push(result.url);

      i++;
    }
    try
    {
      const notes = await Note.update(
        {
          description: description,
          reply_note: reply,
          user_id: saleName,
          note_type_id: noteType,
          pharmacy_id: pharmacyName,
          image: fileNames,
          created_at: moment().format("YYYY-MM-DD, hh:mm:ss"),
        },
        { where: { note_id: note_id } }
      );

      if (!notes)
      {
        return res
          .status(400)
          .json({ msg: "Some error occurred while creating notes" });
      }

      res.status(200).json({ status: "success", notes: notes });
    } catch (error)
    {
      console.log(error.message);
      return res.status(500).json({ msg: error.message });
    }
  },

  deleteAdminNote: async (req, res) =>
  {
    const id = req.params.id;
    try
    {
      const notes = await Note.destroy({
        where: {
          note_id: id,
        },
      });

      if (!notes)
      {
        return res
          .status(400)
          .json({ msg: "Some error occurred while delete note ID = ", id });
      }

      res.status(200).json({ status: "success" });
    } catch (error)
    {
      return res.status(500).json({ msg: error.message });
    }
  },

  updateNote: async (req, res) =>
  {
    const id = req.params.id;
    const { description, reply_note, image, user_id, note_type_id } = req.body;
    try
    {
      const notes = await Note.update(
        {
          description: description,
          reply_note: reply_note,
          image: image,
          user_id: user_id,
          note_type_id: note_type_id,
        },
        { where: { note_id: id } }
      );

      if (!notes)
      {
        return res.status(400).json({
          msg: "Some error occurred while updating notes with NoteID = ",
          id,
        });
      }

      res.status(200).json({ status: "success", notes: notes });
    } catch (error)
    {
      return res.status(500).json({ msg: error.message });
    }
  },
  deleteNote: async (req, res) =>
  {
    const id = req.params.id;
    try
    {
      const notes = await Note.destroy({ where: { note_id: id } });

      if (!notes)
      {
        return res.status(400).json({
          msg: "Some error occurred while deleting notes with NoteID = ",
          id,
        });
      }

      res.status(200).json({ status: "success", notes: notes });
    } catch (error)
    {
      return res.status(500).json({ msg: error.message });
    }
  },
};

export default NoteController;
