const router = require('express').Router();

const Clients = require('../clients/clients-model.js');
const Items = require('../items/items-model.js');
const restricted = require('../auth/restricted-middleware.js');

// GET Clients
router.get('/:id/clients', restricted, async (req, res, next) => {
  const { id } = req.params;

  try {
    const clients = await Clients.findClientsByUserId(id);
    res.status(200).json(clients);
  } catch (err) {
    next({ apiCode: 500, apiMessage: 'failed to get clients' });
  }
});

// GET A Client By ID
router.get('/:id/clients/:client_id', restricted, async (req, res, next) => {
  const { client_id } = req.params;

  try {
    const client = await Clients.findClientById(client_id);
    res.status(200).json(client);
  } catch (err) {
    next({ apiCode: 500, apiMessage: 'failed to get clients' });
  }
});

// POST A Client
router.post('/:id/clients', restricted, async (req, res, next) => {
  const client = req.body;
  client.user_id = req.params.id;

  try {
    const newClient = await Clients.addClient(client);
    res.status(201).json(newClient);
  } catch (err) {
    next({ apiCode: 400, apiMessage: 'missing client fields' });
  }
});

// UPDATE A Client
router.put('/:id/clients/:client_id', restricted, async (req, res, next) => {
  const { client_id } = req.params;
  const changes = req.body;

  try {
    await Clients.updateClient(changes, client_id);
    const updatedClient = await Clients.findClientById(client_id);

    res.status(200).json({
      updatedClient,
      message: 'client updated',
    });
  } catch (err) {
    next({ apiCode: 500, apiMessage: 'failed to update client' });
  }
});

// DELETE A Client
router.delete('/:id/clients/:client_id', restricted, async (req, res, next) => {
  const { client_id } = req.params;
  try {
    await Clients.removeClient(client_id);
    const clients = await Clients.findClientById(client_id);
    res.status(200).json({
      message: 'client deleted',
    });
  } catch (err) {
    next({ apiCode: 500, apiMessage: 'failed to delete client', ...err });
  }
});

// GET Items
router.get(
  '/:id/clients/:client_id/items',
  restricted,
  async (req, res, next) => {
    const { client_id } = req.params;

    try {
      const items = await Items.findItemsByClientId(client_id);
      res.status(200).json(items);
    } catch (err) {
      next({ apiCode: 500, apiMessage: 'failed to get items' });
    }
  }
);

// Add An Item
router.post(
  '/:id/clients/:client_id/items',
  restricted,
  async (req, res, next) => {
    const item = req.body;
    item.client_id = req.params.client_id;

    try {
      const newItem = await Items.addItem(item);
      res.status(201).json(newItem);
    } catch (err) {
      next({ apiCode: 400, apiMessage: 'missing client fields' });
    }
  }
);

// Update An Item
router.put(
  '/:id/clients/:client_id/items/:item_id',
  restricted,
  async (req, res, next) => {
    const { item_id } = req.params;
    const changes = req.body;

    try {
      await Items.updateItem(changes, item_id);
      const updatedItem = await Items.findItemById(item_id);

      res.status(200).json({
        updatedItem,
        message: 'Item updated',
      });
    } catch (err) {
      next({ apiCode: 500, apiMessage: 'failed to update item' });
    }
  }
);

// Delete An Item
router.delete(
  '/:id/clients/:client_id/items/:item_id',
  restricted,
  async (req, res, next) => {
    const { item_id } = req.params;
    try {
      await Items.removeItem(item_id);
      const items = await Items.findItemById(item_id);
      res.status(200).json({
        message: 'item deleted',
      });
    } catch (err) {
      next({ apiCode: 500, apiMessage: 'failed to delete item', ...err });
    }
  }
);

module.exports = router;
