// Afficher les annonces récentes 

import { useState, useEffect } from "react"; // import des hooks UseStates & Useeffect
import axios from "axios"; // import de axios qui permet de faire le lien entre le client http et le serveur
import AdCard, { AdCardProps } from "./AdCard"; 
import DisplayAds from "./DisplayAds"; // import du composant général DisplayAds

const RecentAds = () => {
  const [recentAds, setRecentAds] = useState<AdCardProps[]> ([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios.get<AdCardProps[]>(
          "http://localhost:4000/ad"
        );
        setRecentAds (result.data);
      } catch (err) {
        console.log("error", err);
      }
    };
    fetchData(); 
  }, []);

  const ad: AdCardProps[] = [];

  // retour du composant général avec le tableau de données pour les ajouts récents de 
  return <DisplayAds ads={recentAds} title="Annonces récentes" />;
};

export default RecentAds; 