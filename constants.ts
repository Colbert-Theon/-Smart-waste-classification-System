
import type { Language, LocalizedStrings } from './types';

export const LANGUAGES: { code: Language; name: string }[] = [
  { code: 'en', name: 'English' },
  { code: 'fr', name: 'Français' },
  { code: 'pi', name: 'Pidgin' },
];

export const LOCALIZED_STRINGS: Record<Language, LocalizedStrings> = {
  en: {
    title: 'Smart Waste Sorter',
    description: 'Upload a photo of your waste to get instant sorting instructions for Cameroon. Together, let\'s build a cleaner community.',
    uploadTitle: 'Upload Waste Image',
    uploadOrDrag: 'Click to upload or drag and drop',
    uploadButton: 'Select Image',
    changeImageButton: 'Change Image',
    classifying: 'Classifying...',
    resultTitle: 'Classification Result',
    wasteType: 'Waste Type',
    sortingInstruction: 'Sorting Instruction',
    educationalTip: 'Educational Tip',
    error: 'Sorry, I couldn\'t identify the waste. Please try another image with better lighting.',
    initialPrompt: 'Your sorting instructions will appear here once you upload an image.',
    statsTitle: 'Community Dashboard',
    totalScans: 'Total Items Scanned',
    wasteDistribution: 'Waste Distribution',
    syncButton: 'Sync Offline Data',
    syncMessage: 'Data successfully synced with municipal servers!',
    footer: 'Empowering Cameroonian communities for a sustainable future.'
  },
  fr: {
    title: 'Trieur de Déchets Intelligent',
    description: 'Téléchargez une photo de vos déchets pour obtenir des instructions de tri instantanées pour le Cameroun. Ensemble, construisons une communauté plus propre.',
    uploadTitle: 'Télécharger l\'image du déchet',
    uploadOrDrag: 'Cliquez pour télécharger ou glissez-déposez',
    uploadButton: 'Sélectionner l\'image',
    changeImageButton: 'Changer l\'image',
    classifying: 'Classification en cours...',
    resultTitle: 'Résultat de la Classification',
    wasteType: 'Type de déchet',
    sortingInstruction: 'Instruction de tri',
    educationalTip: 'Conseil Éducatif',
    error: 'Désolé, je n\'ai pas pu identifier le déchet. Veuillez essayer une autre image avec un meilleur éclairage.',
    initialPrompt: 'Vos instructions de tri apparaîtront ici une fois que vous aurez téléchargé une image.',
    statsTitle: 'Tableau de Bord Communautaire',
    totalScans: 'Total d\'articles scannés',
    wasteDistribution: 'Répartition des déchets',
    syncButton: 'Synchroniser les données',
    syncMessage: 'Données synchronisées avec succès avec les serveurs municipaux !',
    footer: 'Autonomiser les communautés camerounaises pour un avenir durable.'
  },
  pi: {
    title: 'Smart Waste Sorter',
    description: 'Upload picture for your dirt for get quick-quick how for throwam for Cameroon. Together, make we build clean quarter.',
    uploadTitle: 'Upload Picture for Dirt',
    uploadOrDrag: 'Click for upload or drag and drop',
    uploadButton: 'Select Picture',
    changeImageButton: 'Change Picture',
    classifying: 'Di check am...',
    resultTitle: 'Wetin We See',
    wasteType: 'Kind of Dirt',
    sortingInstruction: 'How for Throway',
    educationalTip: 'Small Sabee',
    error: 'Sorry, I no see the dirt fine. Try another picture weh e get light fine.',
    initialPrompt: 'How for throway go show here once you upload picture.',
    statsTitle: 'Community Dashboard',
    totalScans: 'All Dirt weh dem Scan',
    wasteDistribution: 'How the Dirt Dem Divide',
    syncButton: 'Sync Data',
    syncMessage: 'Data don sync fine with council server!',
    footer: 'For helep Cameroon people for build better tomorrow.'
  },
};
