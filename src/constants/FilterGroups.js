export const GlobalFilter = {
  Rayon: 0,
  MinStars: 0,
  ServicesFilters: [
    {
      code: "FILTER_1",
      titre1: "Accueil",
      //titre2: "des clés",
      color: "brown",
      width: "25%",
      service: "key",
      selected: false
    },
    {
      code: "FILTER_2",
      titre1: "Ménage",
      //titre2: "et linge",
      color: "green",
      width: "25%",
      service: "trash",
      selected: false
    },
    {
      code: "FILTER_3",
      titre1: "Traveaux",
      //titre2: "divres",
      color: "blue",
      width: "25%",
      service: "tools",
      selected: false
    },

    {
      code: "FILTER-GLOBAL",
      titre1: "Filtres",
      //titre2: "Distance",
      width: "25%",
      service: "menu",
      selected: false,
      isGlobalFilter: true
    }
  ]
};

export default GlobalFilter;
