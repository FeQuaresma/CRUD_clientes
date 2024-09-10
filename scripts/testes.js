const newRow = {
  numero: appJson.modules.pedidos.pages.cadastro.components.numero.value,
  item: appJson.modules.pedidos.pages.cadastro.components.item.value,
  quantidade:
    appJson.modules.pedidos.pages.cadastro.components.quantidade.value,
};

setAppJson((prevForm) => ({
  ...prevForm,
  modules: {
    ...prevForm.modules,
    pedidos: {
      ...prevForm.modules.pedidos,
      pages: {
        ...prevForm.modules.pedidos.pages,
        cadastro: {
          ...prevForm.modules.pedidos.pages.cadastro,
          components: {
            ...prevForm.modules.pedidos.pages.cadastro.components,
            table: {
              ...prevForm.modules.pedidos.pages.cadastro.components.table,
              table: {
                ...prevForm.modules.pedidos.pages.cadastro.components.table
                  .table,
                dataOrigin: {
                  ...prevForm.modules.pedidos.pages.cadastro.components.table
                    .table.dataOrigin,
                  newRow,
                },
                dataTable: {
                  ...prevForm.modules.pedidos.pages.cadastro.components.table
                    .table.dataTable,
                  newRow,
                },
              },
            },
          },
        },
      },
    },
  },
}));
