export const GlobalFilter = {
  Rayon: 0,
  MinStars: 0,
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
      selected: false
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
