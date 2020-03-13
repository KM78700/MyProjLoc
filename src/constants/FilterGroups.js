export const GlobalFilter = {
  Rayon: 50,
  MinStars: 4,
  ServicesFilters: [
    {
      code: "FILTER_1",
      caption: "Accueil",
      color: "brown",
      width: "25%",
      service: "key",
      selected: false
    },
    {
      code: "FILTER_2",
      caption: "Ménage",
      color: "green",
      width: "25%",
      service: "trash",
      selected: true
    },
    {
      code: "FILTER_3",
      caption: "Traveaux",
      color: "blue",
      width: "25%",
      service: "tools",
      selected: false
    },

    {
      code: "FILTER-GLOBAL",
      caption: "Filtres",
      width: "25%",
      service: "menu",
      selected: false,
      isGlobalFilter: true
    }
  ]
};

export default GlobalFilter;
