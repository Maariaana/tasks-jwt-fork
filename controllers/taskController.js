const Task = require('../models/Task');
const User = require('../models/User');

const create = async (req, res) => {
  try {
    const task = await Task.create({ ...req.body, user_id: req.user.id });
    res.status(201).send(task);
  } catch (error) {
    res.status(500).send({ error: 'Failed to create task' });
  }
};

const list = async (req, res) => {
  try {
    const tasks = await Task.findAll({
      where: { user_id: req.user.id },
      include: User,
    });
    res.status(200).send(tasks);
  } catch (error) {
    res.status(500).send({ error: 'Failed to fetch tasks' });
  }
};

const update = async (req, res) => {
  const { id } = req.params;
  try {
    const task = await Task.findOne({ where: { id, user_id: req.user.id } });
    if (!task) return res.status(404).send({ error: 'Task not found' });

    await task.update(req.body);
    res.send(task);
  } catch (error) {
    res.status(500).send({ error: 'Failed to update task' });
  }
};
const complete = async (req, res) => {
  const { id } = req.params;
  try {
    const task = await Task.findOne({ where: { id, user_id: req.user.id } });
    if (!task) return res.status(404).send({ error: 'Task not found' });

    task.completed = true;
    await task.save();

    res.send(task);
  } catch (error) {
    res.status(500).send({ error: 'Failed to complete task' });
  }
};

const remove = async (req, res) => {
  const { id } = req.params;
  try {
    const task = await Task.findOne({ where: { id, user_id: req.user.id } });
    if (!task) return res.status(404).send({ error: 'Task not found' });

    await task.destroy();
    res.send({ message: 'Task deleted' });
  } catch (error) {
    res.status(500).send({ error: 'Failed to delete task' });
  }
};

module.exports = {
  create,
  list,
  update,
  complete,
  remove
};