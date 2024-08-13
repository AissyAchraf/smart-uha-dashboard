export const DemandStates = {
    AConfirmer: 0, // La demande doit être confirmée
    PriseEnCompte: 5, // La demande sera traitée à la date et heure choisie

    AttenteRecuperation: 10, // Le robot est sur le chemin vers l'émetteur

    RecuperationAttenteDeblocage: 15, // Le robot attend que l'émetteur ait débloqué la porte
    RecuperationAttenteOuverture: 17, // le robot attend que l'émetteur ait ouvert la porte
    Recuperation: 20, // Le robot attend que l'émetteur ait déposé le colis
    RecuperationAttenteConfirmation: 30, // Le robot est ouvert et doit être fermé
    RecuperationConfirmee: 35, // Le colis a bien été récupéré

    AttenteLivraison: 40, // Le colis est dans le robot et arrive vers le destinataire

    LivraisonAttenteDeblocage: 45, // Le robot attend que le destinataire ait débloqué la porte
    LivraisonAttenteOuverture: 47, // Le robot attend que le destinataire ait ouvert la porte
    Livraison: 50, // Le robot attend que le destinataire ait récupéré le colis
    LivraisonAttenteConfirmation: 60, // Le robot est fermé et doit être rouvert ou lancé
    LivraisonAttenteConfirmee: 65, // Le colis a bien été récupéré

    Livre: 70, // Le colis est auprès du destinataire


    //Codes d'erreurs :

    Supprimee: 301, // La demande avait été validée et livrée, mais a été annulée par après
    Annulee: 302, // La demande a été annulée avant d'avoir été finie

    ErreurAnnulePacketPresent: 401, // La demande a été annulé, mais le packet est dans le véhicule
    ErreurConfirmationTimedOut: 402, //La confirmation de la demande n'a pas été faite avant le time out

    ErreurRecuperationOuvertureTimedOut: 403, //L'ouverture de porte de la demande en dépot n'a pas été faite avant le time out
    ErreurRecuperationFermetureTimedOut: 404, //La fermeture de porte de la demande en dépot  n'a pas été faite avant le time out
    ErreurRecuperationValidationTimeOut: 405, //La validation du dépot n'a pas été faite avant le time out

    ErreurLivraisonOuvertureTimedOut: 406, //L'ouverture de porte de la demande en livraison n'a pas été faite avant le time out
    ErreurLivraisonFermetureTimedOut: 407, //La fermeture de porte de la demmande en livraison n'a pas été faite avant le time out
    ErreurLivraisonValidationTimeOut: 408, //La validation de la livraison n'a pas été faite avant le time out
};