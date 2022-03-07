import generateData from "month-data-generator";

export function getData() {

let islands = [ "Crete", "Evia", "Lesbos", "Rhodes", "Chíos", "Cephalonia", "Corfu", "Lemnos", "Samos", "Naxos", "Zakynthos", "Thassos", "Andros", "Lefkada", "Karpathos", "Kos", "Kythira", "Icaria", "Skyros", "Paros", "Tinos", "Samothrace", "Milos", "Kea", "Amorgos", "Kalymnos", "Ios", "Kythnos", "Astypalaia", "Ithaca", "Salamis" ];
  const monthData = [
    { min: 9, max: 15, name: "January"  },
    { min: 9, max: 15, name: "February"  },
    { min: 10, max: 17, name: "March"  },
    { min: 12, max: 20, name: "April"  },
    { min: 15, max: 23, name: "May"  },
    { min: 19, max: 27, name: "June"  },
    { min: 22, max: 29, name: "July"  },
    { min: 22, max: 29, name: "August"  },
    { min: 20, max: 27, name: "September"  },
    { min: 17, max: 24, name: "October"  },
    { min: 14, max: 20, name: "November"  },
    { min: 11, max: 17, name: "December"  },
  ];
  const config = {
    names: islands,
    amount: 38,
    minMaxData: monthData
  }
  const rawData = generateData(config)
  let data = []
  for (const [i, d] of Object.entries(rawData)) {
    d.island = d.name;
    d.temp = d.d
    data.push(d)
  }
  return data;
}
