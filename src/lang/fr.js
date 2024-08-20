export default {
    app:{
        title: "Livraison {location}"
    },
    date: {
        format: "dd/MM/yyyy H:mm"
    },
    header: {
        home: "Accueil",
        account: "Profil",
        logout: "Déconnexion",
        admin: "Admin"
    },
    home:{
        welcome: "Bienvenue au service de livraison SMART UHA",
        send:"Envoyer",
        follow:"Suivre",
        sendPack: "Envoyer Colis",
        followPack:"Suivre Colis"
    },
    sendColis:{
        title: "Formulaire d'envoi de Colis",
        subtitle: "Complétez ce formulaire pour expédier vos colis en toute simplicité",
        cardTitle: "Programmer une demande de livraison",
        origin: "Origine",
        destination: "Destination",
        receiver : "Destinataire",
        size:"Taille",
        vehicle: "Véhicule",
        send:"Envoyer",
        cancel:"Annuler",
        dueDate: "Date et horaire de livraison",
        samePoints: "L'origine et la destination doivent être différentes",
        success: "Votre commande de livraison a été créée!",
        error: "Une erreur est survenue. Veuillez réessayer.",
    },
    login:{
        connection:"Connexion",
        serverError:"Erreur de connexion au serveur : Réessayez ultérieurement ou contactez un administrateur",
        authenticateError:"Erreur de connexion : L'identifiant ou le mot de passe est incorrect"
    },
    sendResume: {
        title: "Confirmation de la demande",
        subtitle: "Veuillez vérifier les détails de votre demande ci-dessous, puis cliquez sur 'Confirmer' pour finaliser.",
        summary:"Récapitulatif",
        origin: "Origine",
        size: "Taille",
        sizeList: {
            letter: "Lettre",
            packet: "Colis"
        },
        destination: "Destination",
        receiver: "Destinataire",
        dueAt: "Date et horaire de livraison",
        confirmed: "Demande Confirmée!",
        canceled: "Demande Annulée.",
        confirm: "Confirmer",
        cancel: "Annuler",
        loading: "Chargement en cours..."
    },
    track:{
        title: "Suivez vos livraisons",
        subtitle: "Consultez le statut de vos livraisons en cours ci-dessous et restez informé de leur progression.",
        loading: "Chargement en cours...",
        letters:"Vos Couriers",
        ongoing: "Livraisons en cours",
        complete: "Livraisons terminées",
        noDemands: "Aucune livraison en cours",
        nDeliveriesInProgress: "Vous n'avez actuellement aucune livraison en cours. Pourquoi ne pas envoyer un colis dès maintenant ?"
    },
    trackInformation:{
        open: "Débloquer",
        send: "Envoyer",
        finish: "Terminer",
        sender: "Emetteur",
        receiver: "Destinataire",
        origin: "Origine",
        destination: "Destination",
        updatedAt: "Dernière mise-à-jour"
    },
    enum:{
        confirm: "demande à confirmer",
        confirmed: "la demande sera traitée à la date choisie", 
        waitRecovery: "le robot est en chemin",
        waitUnlock: "attente de déblocage",
        waitAperture: "vous pouvez ouvrir la porte",
        waitSender: "vous pouvez déposer votre livraison et fermer la porte",
        waitConfirm: "en attente de confirmation de l'utilisateur",
        waitConfirmed: "le dépot du colis a été validé par l'utilisateur",
        waitDelivery: "le colis est en route",
        waitReceiver: "vous pouvez prendre votre livraison et fermer la porte",
        delivered: "colis livré"
    },
    account: {
        information : "Mes informations"
    },
    notifications: {
        robot_partance_livraison: 'Le robot arrive à {destination} pour livrer un colis',
        robot_partance_recuperation: 'Le robot arrive à {destination} pour récupérer un colis',
        activated: "Les notifications sont activés!"
    },
    robot: {
        states: {
            error: "Erreur",
            available: "Prêt",
            maintenance: "En Maintenance",
            unavailable: "Indisponible"
        },
        stateModal: {
            title: "État du véhicule",
            body: "Le véhicule est {robotState}. Sélectionner un nouvel état ?",
            error: "Erreur: Impossible d'accéder au véhicule",
        }
    },
    admin: {
        labels: {
            demands: "Demandes",
            archives: "Archives",
            vehicles: "Véhicules",
            rois: "Rois",
            supervisor: "Superviseur"
        },
        demand: {
            sender: "Emetteur",
            receiver: "Destinataire",
            origin: "Origine",
            destination: "Destination",
            box: "Boite",
            vehicle: "Véhicule",
            loadingVehicle: "Chargement du nom du véhicule",
            loadingVehicleFailed: "Erreur: impossible de trouver le nom du véhicule",
            noVehicle: "Pas de véhicule affecté pour le moment",
            size: "Taille",
            state: "Status",
            createdAt: "Création",
            updatedAt: "Mise-à-jour",
            dueAt: "Date de livraison",
            askForCancel: "Voulez vous vraiment annuler/supprimer cette demande?",
            cancellation: "Annuler",
            deletion: "Supprimer",
            unknown: "Inconnu",
            nodemands: "Aucune demande trouvée",
            error: "Demandes ayant une erreur",
            ongoing: "En cours de livraison",
            onhold: "En attente",
            completed: "Completée",
            schizophrenicUsed: "Authentification schizophrène utilisée",
            errorCancelledPackageStillIn: "Annulée mais le packet est dans le véhicule",
            errorPickupDoorOpeningTimedOut: "La porte n'a pas été ouverte avant le timeout pour la récupération",
            errorPickupDoorClosingTimedOut: "La porte n'a pas été fermée avant le timeout pour la récupération",
            errorPickupValidationTimedOut: "La récupération n'a pas été validée avant le timeout",
            errorDeliveryDoorOpeningTimedOut: "La porte n'a pas été ouverte avant le timeout pour le dépôt",
            errorDeliveryDoorClosingTimedOut: "La porte n'a pas été fermée avant le timeout pour le dépôt",
            errorDeliveryValidationTimedOut: "Le dépôt n'a pas été validé avant le timeout",
            logs: "Journal",
            filterByVehicle: "Filtrer par véhicule :",
        },
        archives: {
            older: "Completé(s) il y a plus de 3 jours",
        },
        vehicle: {
            name: "Nom",
            battery: "Batterie",
            batteryCharging: "Chargement de la batterie",
            batteryCharged: "Chargement complété",
            batteryOk: "Niveau de charge ok",
            batteryCritical: "Niveau de charge critique",
            batteryError:"Erreur",
            loading: "Chargement ...",
            supervisor: "Superviseur",
            localization: "Localisation",
            car: "Etat",
            io: "Forcer l'ouverture/fermeture de portes",
            boxes: "Désactiver/Activer des portes",
            lastSeen: "Dernière MAJ",
            planning: "Planification",
            open: "La porte est actuellement ouverte",
            close: "La porte est actuellement fermé",
            noDestinations: "choisir",
            warning: "êtes vous sur de déclancher cette commande?",
            availableLabel: "Disponibilité",
            available: "Prêt",
            unavailable: "Indisponible",
            deactivatedDoorWarning: "Cette porte a été désactivée et ne peut être ouverte.",
            deactivate: "Désactiver cette porte?",
            activate: "Activer cette porte?",
            area: "Zones",
            toMaintenance: "Envoyer en maintenance",
            maintenancePoint: "Point de maintenance"
        },
        roi: {
            supervisorId: "Numéro",
            name: "Nom",
            displayName: "Nom d'Affiche",
            isDeliveryPoint: "Point de Livraison",
            canDeliver: "Oui",
            cannotDeliver: "Non",
            warning: "êtes vous sur de déclancher cette commande?"
        },
        supervisor: {
            idleCpuDesc: "Pourcentage total non utilisé par l'application des CPU(s)",
            totalCpuUsedDesc: "Pourcentage total utilisé des CPU(s) par l'application (User + Sys)",
            userCpuDesc: "Pourcentage utilisé des CPU(s) par l'application dans l'espace user (quand le processeur travaille sur des fonctionnalités de l'application)",
            sysCpuDesc: "Pourcentage utilisé des CPU(s) par l'application dans l'espace kernel (quand le processeur travaille sur des fonctionnalités du système d'exploitation liée à l'application)",
            rssDesc: "Mémoire totale allouée au serveur",
            heapTotalDesc: "Mémoire totale allouée aux objets du serveur",
            heapUsedDesc: "Mémoire utilisée pour les objets du serveur",
            externalDesc: "Mémoire utilisée pour les objets C++ qui sont liés aux objets JavaScript (cela inclut les arrayBuffers)",
            arrayBuffersDesc: "Mémoire allouée aux ArrayBuffer et SharedArrayBuffer",
            garbageCollector: "Collecteur de déchets du serveur",
            UpdatingMapWarn: "Attention : Tous les véhicules doivent être en état Indisponible pour mettre à jour la carte sur la base de données.",
            UpdatingMapVehicleError: "Erreur: Impossible de mettre à jour la carte sur la base de données. Un ou plusieurs véhicules ne sont pas en état Indisponible.",
            UpdatingMapError: "Erreur: La mise à jour de la carte a échouée. Vérifier votre connection internet ou contacter un administrateur."
        }
    },
    editableInput: {
        empty: "Aucun"
    },
    form: {
        required: "Requis",
    },
    trackSteps: {
        sendLocation: "Lieu d'envoie",
        packagePlacement: "Expédition",
        onTheWay: "En route",
        deliveryConfirmation: "Confirmation de livraison"
    }
}