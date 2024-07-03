/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('table_name').del()
  await knex('table_name').insert([
    {id: 1, colName: 'rowValue1'},
    {id: 2, colName: 'rowValue2'},
    {id: 3, colName: 'rowValue3'}
  ]);
};
exports.seed = function (knex){
  return knex("livros").del().then(function () {
    return knex("livros").insert([
      {
        titulo: "Senhor dos aneis Parte 1", autor: "J.R.R. Tolkien", ano: 1954,
        preco: 69.90, foto: "https://m.media-amazon.com/images/I/81hCVEC0ExL._AC_UY218_.jpg"
      },
      {
        titulo: "Senhor dos aneis Parte 2", autor: "J.R.R. Tolkien", ano: 1954,
        preco: 69.90, foto: "https://m.media-amazon.com/images/I/81lQ5N0QwJL._AC_UY218_.jpg"
      },
      {
        titulo: "Senhor dos aneis Parte 3", autor: "J.R.R. Tolkien", ano: 1955,
        preco: 69.90, foto: "https://m.media-amazon.com/images/I/71+4uDgt8JL._AC_UY218_.jpg"
      },
      {
        titulo: "As Crônicas de Narnia", autor: "C.S. Lewis", ano: 2009,
        preco: 84.00, foto: "https://m.media-amazon.com/images/I/71yJLhQekBL._AC_UY218_.jpg"
      },
      {
        titulo: "A dança dos Dragões", autor: "G.R.R. Martin", ano: 2011,
        preco: 85.64, foto: "https://m.media-amazon.com/images/I/91gIftSmvhL._AC_UF350,350_QL50_DpWeblab_.jpg"
      },
    ]);
  });
}
