  const areas = [
    { id: 1, name: "Ciências Exatas" },
    { id: 2, name: "Ciências Humanas" },
    { id: 3, name: "Ciências Biológicas" },
  ]
  async function findAll() {
    return await areas
  }
  
  async function findOne(id) {
    return areas.find(a => a.id === id);
  }

export default { findAll, findOne }