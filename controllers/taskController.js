const Task = require('../models/Task');
const User = require('../models/User');

const list = async (req, res) => {
  try {
    const tasks = await Task.findAll({ where: { user_id: req.user.id } });
    res.render("tasks/listar", { tasks, error: null });
  } catch (error) {
    res.render("tasks/listar", { tasks: [], error: "Erro ao carregar tarefas" });
  }
};

const createForm = (req, res) => {
  res.render("tasks/criar");
};

const create = async (req, res) => {
  try {
    await Task.create({
      titulo: req.body.titulo,
      descricao: req.body.descricao,
      completada: req.body.completada === "on",
      user_id: req.user.id,
    });
    res.redirect("/tasks");
  } catch (error) {
    res.render("tasks/criar", { error: "Erro ao criar tarefa" });
  }
};

const update = async (req, res) => {
  const { id } = req.params;
  try {
    const task = await Task.findOne({ where: { id, user_id: req.user.id } });
    if (!task) return res.status(404).send({ error: 'Task not found' });

  await task.update(req.body);
  res.redirect("/tasks");
  } catch (error) {
    res.status(500).send({ error: 'Failed to update task' });
  }
};
const complete = async (req, res) => {
  const { id } = req.params;
  try {
    const task = await Task.findOne({ where: { id, user_id: req.user.id } });
    if (!task) return res.status(404).send({ error: 'Task not found' });

    task.completada = req.body.completada === "on";
    await task.save();

    res.redirect("/tasks");
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
  res.redirect("/tasks");
  } catch (error) {
    res.status(500).send({ error: 'Failed to delete task' });
  }
};

const editForm = async (req, res) => {
  const { id } = req.params;
  try {
    const task = await Task.findOne({ where: { id, user_id: req.user.id } });
    if (!task) {
      return res.status(404).render("tasks/editar", { error: "Tarefa não encontrada" });
    }
    res.render("tasks/editar", { task });
  } catch (error) {
    res.status(500).render("tasks/editar", { error: "Erro ao carregar tarefa" });
  }
};

module.exports = {
  create,
  list,
  update,
  complete,
  remove,
  createForm,
  editForm
};