
import { Article } from '@/types/article';

export const articles: Article[] = [
  {
    id: '1',
    title: "Comprendre l'Alzheimer: Signes précoces et traitements actuels",
    slug: "comprendre-alzheimer-signes-et-traitements",
    excerpt: "L'Alzheimer est une maladie neurodégénérative qui touche principalement les personnes âgées. Découvrez les signes précoces et les traitements disponibles.",
    content: `
      <h2>Qu'est-ce que la maladie d'Alzheimer?</h2>
      <p>La maladie d'Alzheimer est une maladie neurodégénérative qui provoque une détérioration progressive et irréversible des cellules nerveuses du cerveau. Elle représente la cause la plus fréquente de démence chez les personnes âgées et affecte environ 50 millions de personnes dans le monde.</p>
      
      <h2>Les signes précoces</h2>
      <p>Les premiers symptômes de la maladie d'Alzheimer peuvent être subtils et souvent confondus avec les effets normaux du vieillissement. Voici quelques signes précoces à surveiller:</p>
      <ul>
        <li>Perte de mémoire affectant la vie quotidienne</li>
        <li>Difficultés à planifier ou résoudre des problèmes</li>
        <li>Confusion avec le temps ou le lieu</li>
        <li>Problèmes de langage et de communication</li>
        <li>Jugement altéré</li>
        <li>Retrait social et professionnel</li>
      </ul>
      
      <h2>Traitements actuels</h2>
      <p>Bien qu'il n'existe pas encore de traitement curatif pour la maladie d'Alzheimer, plusieurs approches peuvent aider à gérer les symptômes et améliorer la qualité de vie:</p>
      <ul>
        <li><strong>Traitements médicamenteux</strong>: Inhibiteurs de la cholinestérase et mémantine qui peuvent temporairement améliorer les symptômes.</li>
        <li><strong>Thérapies non médicamenteuses</strong>: Stimulation cognitive, thérapie par réminiscence, activité physique régulière.</li>
        <li><strong>Aménagements du cadre de vie</strong>: Adapter l'environnement pour plus de sécurité et moins de confusion.</li>
        <li><strong>Soutien aux aidants</strong>: Formation et soutien psychologique pour les proches qui accompagnent les patients.</li>
      </ul>
      
      <h2>Recherches en cours</h2>
      <p>La recherche sur la maladie d'Alzheimer est très active, avec plusieurs pistes prometteuses:</p>
      <ul>
        <li>Développement de nouveaux médicaments ciblant les plaques amyloïdes et les enchevêtrements neurofibrillaires.</li>
        <li>Thérapies immunologiques visant à stimuler le système immunitaire pour éliminer les protéines toxiques.</li>
        <li>Approches préventives basées sur la nutrition, l'exercice et la stimulation cognitive.</li>
      </ul>
      
      <h2>Comment Mylli Services peut vous aider</h2>
      <p>Chez Mylli Services, nos professionnels sont formés pour accompagner les personnes atteintes de la maladie d'Alzheimer et leurs familles. Nos services incluent:</p>
      <ul>
        <li>Soins personnalisés à domicile</li>
        <li>Stimulation cognitive adaptée</li>
        <li>Soutien aux aidants familiaux</li>
        <li>Formation spécifique pour les proches</li>
      </ul>
      
      <p>Si vous ou un proche êtes concernés par la maladie d'Alzheimer, n'hésitez pas à nous contacter pour un accompagnement professionnel et bienveillant.</p>
    `,
    imageSrc: "https://cdn.pixabay.com/photo/2023/12/01/11/45/alzheimers-disease-8423553_640.png",
    imageAlt: "Accompagnement d'une personne âgée atteinte d'Alzheimer",
    category: "Maladies neurodégénératives",
    publishedDate: "2023-11-15",
    readTime: 8,
    author: "Dr. Sophie Martin"
  },
  {
    id: '2',
    title: "Prévention des chutes chez les personnes âgées: Guide pratique",
    slug: "prevention-chutes-personnes-agees",
    excerpt: "Les chutes représentent un risque majeur pour les seniors. Découvrez nos conseils pratiques pour sécuriser le domicile et prévenir les accidents.",
    content: `
      <h2>L'importance de la prévention des chutes</h2>
      <p>Les chutes sont la principale cause de blessures chez les personnes âgées et peuvent avoir des conséquences graves sur leur santé et leur autonomie. Chaque année, près d'un tiers des personnes de plus de 65 ans sont victimes d'une chute, dont les conséquences peuvent être dramatiques: fractures, hospitalisation, perte d'autonomie, voire décès.</p>
      
      <h2>Facteurs de risque</h2>
      <p>Plusieurs facteurs peuvent augmenter le risque de chute chez les personnes âgées:</p>
      <ul>
        <li>Troubles de l'équilibre et de la marche</li>
        <li>Diminution de la force musculaire</li>
        <li>Problèmes de vision</li>
        <li>Certains médicaments (somnifères, antidépresseurs...)</li>
        <li>Maladies chroniques (Parkinson, arthrose...)</li>
        <li>Environnement inadapté au domicile</li>
      </ul>
      
      <h2>Sécuriser le domicile</h2>
      <p>Voici quelques aménagements simples mais efficaces pour rendre le domicile plus sûr:</p>
      <ul>
        <li>Éliminer les obstacles: fils électriques, petits meubles, tapis...</li>
        <li>Installer des barres d'appui dans la salle de bain et les toilettes</li>
        <li>Améliorer l'éclairage, particulièrement dans les escaliers</li>
        <li>Privilégier les sols antidérapants</li>
        <li>Disposer les objets d'usage quotidien à portée de main</li>
      </ul>
      
      <h2>Exercices recommandés</h2>
      <p>L'activité physique régulière joue un rôle clé dans la prévention des chutes:</p>
      <ul>
        <li>Exercices d'équilibre (tai-chi, yoga adapté...)</li>
        <li>Renforcement musculaire ciblé (jambes et hanches principalement)</li>
        <li>Marche quotidienne</li>
        <li>Étirements pour maintenir la souplesse</li>
      </ul>
      
      <h2>Suivi médical</h2>
      <p>Un suivi médical régulier permet de:</p>
      <ul>
        <li>Réévaluer les traitements médicamenteux</li>
        <li>Contrôler la vision et l'audition</li>
        <li>Adapter les aides techniques (canne, déambulateur...)</li>
        <li>Suivre l'évolution des pathologies chroniques</li>
      </ul>
      
      <h2>L'expertise de Mylli Services</h2>
      <p>Chez Mylli Services, nous proposons:</p>
      <ul>
        <li>Une évaluation personnalisée des risques à domicile</li>
        <li>Des conseils d'aménagement du logement</li>
        <li>Un accompagnement pour les activités physiques adaptées</li>
        <li>Une présence rassurante pour sécuriser le quotidien</li>
      </ul>
      
      <p>La prévention des chutes est un élément essentiel du maintien à domicile des personnes âgées dans de bonnes conditions. N'hésitez pas à nous contacter pour bénéficier de notre expertise dans ce domaine.</p>
    `,
    imageSrc: "https://www.infosante.be/storage/guides/9728113f-92b5-4c68-ae5f-640ab1666a4f/IlJCgq8DoA332DiT52cW60rQpWhvWRzspHWkasXC_main.jpg",
    imageAlt: "Aménagement sécurisé pour prévenir les chutes",
    category: "Prévention et sécurité",
    publishedDate: "2023-09-22",
    readTime: 6,
    author: "Mme Claire Dupont"
  },
  {
    id: '3',
    title: "Nutrition adaptée pour les seniors: conseils et menus équilibrés",
    slug: "nutrition-adaptee-seniors",
    excerpt: "Une alimentation équilibrée est essentielle pour préserver la santé des personnes âgées. Découvrez nos recommandations nutritionnelles spécifiques.",
    content: `
      <h2>Les besoins nutritionnels spécifiques des seniors</h2>
      <p>Avec l'âge, les besoins nutritionnels évoluent tandis que l'appétit diminue souvent. Il est donc crucial d'adapter l'alimentation pour maintenir un bon état de santé et prévenir les carences.</p>
      
      <h2>Macronutriments essentiels</h2>
      <p>Voici comment équilibrer les apports en macronutriments chez les personnes âgées:</p>
      <ul>
        <li><strong>Protéines</strong>: Les besoins sont augmentés (1g/kg de poids corporel) pour lutter contre la sarcopénie (perte musculaire). Privilégier les sources de protéines de haute qualité: viandes maigres, poissons, œufs, produits laitiers, légumineuses.</li>
        <li><strong>Glucides</strong>: Favoriser les glucides complexes à index glycémique bas (céréales complètes, légumineuses) pour maintenir une glycémie stable.</li>
        <li><strong>Lipides</strong>: Privilégier les bonnes graisses (huile d'olive, poissons gras) riches en oméga-3, bénéfiques pour la santé cardiovasculaire et cognitive.</li>
      </ul>
      
      <h2>Micronutriments à surveiller</h2>
      <p>Certains micronutriments nécessitent une attention particulière:</p>
      <ul>
        <li><strong>Calcium et vitamine D</strong>: Essentiels pour la santé osseuse et la prévention de l'ostéoporose.</li>
        <li><strong>Vitamine B12</strong>: Son absorption diminue avec l'âge, augmentant le risque de carence.</li>
        <li><strong>Fer</strong>: Pour prévenir l'anémie, fréquente chez les seniors.</li>
        <li><strong>Antioxydants</strong>: Vitamines C, E et bêta-carotène pour renforcer les défenses immunitaires.</li>
      </ul>
      
      <h2>Hydratation</h2>
      <p>La sensation de soif diminue avec l'âge, pourtant les besoins en eau restent importants. Recommandations:</p>
      <ul>
        <li>Boire au minimum 1,5L d'eau par jour, même sans sensation de soif</li>
        <li>Varier les sources d'hydratation: eau, tisanes, bouillons, fruits et légumes riches en eau</li>
        <li>Limiter la consommation d'alcool et de boissons caféinées</li>
      </ul>
      
      <h2>Exemple de menus équilibrés</h2>
      <p><strong>Petit-déjeuner:</strong></p>
      <ul>
        <li>Yaourt nature enrichi en protéines</li>
        <li>Flocons d'avoine avec fruits frais</li>
        <li>Une tranche de pain complet avec un peu de beurre</li>
        <li>Thé ou café sans sucre</li>
      </ul>
      
      <p><strong>Déjeuner:</strong></p>
      <ul>
        <li>Poisson grillé ou viande maigre (100g)</li>
        <li>Légumes cuits à la vapeur</li>
        <li>Riz complet ou quinoa</li>
        <li>Fruit frais de saison</li>
      </ul>
      
      <p><strong>Collation:</strong></p>
      <ul>
        <li>Compote sans sucre ajouté</li>
        <li>Quelques amandes ou noix</li>
      </ul>
      
      <p><strong>Dîner:</strong></p>
      <ul>
        <li>Soupe de légumes maison</li>
        <li>Omelette aux herbes</li>
        <li>Salade verte avec vinaigrette à l'huile d'olive</li>
        <li>Yaourt nature avec un peu de miel</li>
      </ul>
      
      <h2>Comment Mylli Services peut vous aider</h2>
      <p>Nos services incluent:</p>
      <ul>
        <li>Aide à la préparation de repas équilibrés</li>
        <li>Courses et sélection de produits adaptés</li>
        <li>Conseils nutritionnels personnalisés</li>
        <li>Suivi de l'hydratation quotidienne</li>
      </ul>
      
      <p>Une bonne nutrition est un pilier essentiel du bien-vieillir. Nos équipes sont formées pour vous accompagner dans cette démarche préventive et thérapeutique.</p>
    `,
    imageSrc: "https://st4.depositphotos.com/1194063/20517/i/450/depositphotos_205175278-stock-photo-healthy-food-selection-food-sources.jpg",
    imageAlt: "Alimentation équilibrée pour seniors",
    category: "Nutrition et bien-être",
    publishedDate: "2024-01-10",
    readTime: 7,
    author: "Dr. Thomas Blanc"
  },
  {
    id: '4',
    title: "Diabète chez les personnes âgées: symptômes et gestion au quotidien",
    slug: "diabete-personnes-agees-symptomes-gestion",
    excerpt: "Le diabète chez les seniors présente des défis spécifiques. Découvrez comment reconnaître les signes et gérer cette maladie chronique au quotidien.",
    content: `
      <h2>Le diabète chez les personnes âgées: une maladie aux multiples facettes</h2>
      <p>Le diabète est une maladie chronique qui touche particulièrement les personnes âgées, avec une prévalence qui augmente avec l'âge. Chez les plus de 65 ans, près d'un quart de la population est concernée, ce qui en fait un véritable enjeu de santé publique.</p>
      
      <h2>Types de diabète et particularités chez les seniors</h2>
      <p>Les personnes âgées peuvent être touchées par les deux principaux types de diabète:</p>
      <ul>
        <li><strong>Diabète de type 1</strong>: Bien que généralement diagnostiqué plus tôt dans la vie, certains cas peuvent apparaître à un âge avancé.</li>
        <li><strong>Diabète de type 2</strong>: C'est la forme la plus fréquente chez les seniors, souvent liée au surpoids, à la sédentarité et aux changements métaboliques liés à l'âge.</li>
      </ul>
      
      <h2>Symptômes particuliers chez les personnes âgées</h2>
      <p>Le diabète peut se manifester différemment chez les seniors, avec des symptômes parfois atypiques:</p>
      <ul>
        <li>Fatigue inexpliquée et persistante</li>
        <li>Infections récurrentes, notamment urinaires ou cutanées</li>
        <li>Cicatrisation lente des plaies</li>
        <li>Troubles visuels progressifs</li>
        <li>Déshydratation</li>
        <li>Confusion mentale ou troubles cognitifs soudains</li>
      </ul>
      <p>Il est important de noter que la sensation de soif, symptôme classique du diabète, peut être diminuée chez les personnes âgées, rendant le diagnostic plus difficile.</p>
      
      <h2>Complications spécifiques</h2>
      <p>Les complications du diabète sont particulièrement préoccupantes chez les seniors:</p>
      <ul>
        <li><strong>Hypoglycémies</strong>: Plus fréquentes et dangereuses car souvent non ressenties</li>
        <li><strong>Risques cardiovasculaires</strong>: Infarctus, AVC</li>
        <li><strong>Neuropathies</strong>: Douleurs, perte de sensibilité pouvant favoriser les chutes</li>
        <li><strong>Néphropathie</strong>: Insuffisance rénale</li>
        <li><strong>Rétinopathie</strong>: Troubles visuels pouvant aller jusqu'à la cécité</li>
      </ul>
      
      <h2>Gestion quotidienne adaptée</h2>
      <p>La prise en charge du diabète chez les seniors doit être personnalisée:</p>
      <ul>
        <li><strong>Objectifs glycémiques moins stricts</strong>: Pour éviter les hypoglycémies</li>
        <li><strong>Alimentation équilibrée</strong>: Sans restrictions excessives pour maintenir un bon état nutritionnel</li>
        <li><strong>Activité physique adaptée</strong>: Marche, natation douce, tai-chi</li>
        <li><strong>Suivi médical régulier</strong>: Au moins tous les 3 mois</li>
        <li><strong>Éducation thérapeutique</strong>: Adaptée aux capacités cognitives</li>
      </ul>
      
      <h2>Traitements spécifiques</h2>
      <p>Certains traitements sont à privilégier ou à éviter chez les seniors:</p>
      <ul>
        <li><strong>Metformine</strong>: Généralement bien tolérée mais attention à la fonction rénale</li>
        <li><strong>Insuline</strong>: Parfois nécessaire, avec un apprentissage adapté</li>
        <li><strong>Sulfamides</strong>: À utiliser avec précaution (risque d'hypoglycémie)</li>
        <li><strong>Nouvelles classes thérapeutiques</strong>: Inhibiteurs DPP-4, analogues GLP-1, inhibiteurs SGLT-2, à discuter selon les cas</li>
      </ul>
      
      <h2>Comment Mylli Services accompagne les seniors diabétiques</h2>
      <p>Notre équipe spécialisée propose:</p>
      <ul>
        <li>Aide à la surveillance glycémique</li>
        <li>Accompagnement nutritionnel</li>
        <li>Rappel de prise des médicaments</li>
        <li>Surveillance des pieds (prévention du pied diabétique)</li>
        <li>Coordination avec les professionnels de santé</li>
      </ul>
      
      <p>La bonne nutrition est un pilier essentiel du bien-vieillir. Nos équipes sont formées pour vous accompagner dans cette démarche préventive et thérapeutique.</p>
    `,
    imageSrc: "https://www.korian.fr/medias/webp/As56565",
    imageAlt: "Gestion du diabète chez les personnes âgées",
    category: "Maladies chroniques",
    publishedDate: "2024-02-05",
    readTime: 9,
    author: "Dr. Antoine Dupuis"
  },
  {
    id: '5',
    title: "AVC: reconnaître les signes et agir rapidement",
    slug: "avc-reconnaitre-signes-agir-rapidement",
    excerpt: "L'accident vasculaire cérébral (AVC) est une urgence médicale qui nécessite une intervention rapide. Apprenez à reconnaître les signes et à réagir efficacement.",
    content: `
      <h2>Qu'est-ce qu'un AVC?</h2>
      <p>Un accident vasculaire cérébral (AVC) survient lorsque la circulation sanguine vers le cerveau est interrompue, soit par un caillot (AVC ischémique, 80% des cas), soit par une rupture d'un vaisseau sanguin (AVC hémorragique, 20% des cas). Dans les deux cas, les cellules cérébrales privées d'oxygène commencent à mourir rapidement, d'où l'importance d'une prise en charge immédiate.</p>
      
      <h2>Les facteurs de risque</h2>
      <p>Certaines personnes sont plus à risque de subir un AVC:</p>
      <ul>
        <li>Personnes de plus de 65 ans</li>
        <li>Hypertension artérielle</li>
        <li>Diabète</li>
        <li>Tabagisme</li>
        <li>Hypercholestérolémie</li>
        <li>Fibrillation auriculaire</li>
        <li>Antécédents familiaux d'AVC</li>
        <li>Obésité et sédentarité</li>
        <li>Apnée du sommeil</li>
      </ul>
      
      <h2>Reconnaître les signes d'AVC: la méthode FAST</h2>
      <p>Pour identifier rapidement un AVC, retenez l'acronyme FAST (Face, Arms, Speech, Time):</p>
      <ul>
        <li><strong>F (Face/Visage)</strong>: Demandez à la personne de sourire. Un côté du visage est-il affaissé?</li>
        <li><strong>A (Arms/Bras)</strong>: Demandez à la personne de lever les deux bras. Un bras descend-il involontairement?</li>
        <li><strong>S (Speech/Parole)</strong>: La personne a-t-elle des difficultés à parler ou à comprendre? Sa parole est-elle embrouillée?</li>
        <li><strong>T (Time/Temps)</strong>: Si vous observez un de ces signes, appelez immédiatement les secours (15, 112 ou 114).</li>
      </ul>
      
      <p>D'autres symptômes peuvent également signaler un AVC:</p>
      <ul>
        <li>Trouble soudain de l'équilibre ou de la coordination</li>
        <li>Maux de tête intenses et inhabituels</li>
        <li>Trouble brutal de la vision d'un œil ou des deux yeux</li>
        <li>Engourdissement soudain du visage, d'un bras ou d'une jambe</li>
      </ul>
      
      <h2>Agir face à un AVC: chaque minute compte</h2>
      <p>En cas de suspicion d'AVC:</p>
      <ul>
        <li><strong>Appelez immédiatement le 15 (SAMU)</strong> en précisant que vous suspectez un AVC</li>
        <li>Notez l'heure d'apparition des premiers symptômes (crucial pour le traitement)</li>
        <li>Allongez la personne sur le côté, en position latérale de sécurité</li>
        <li>Desserrez ses vêtements, surtout au niveau du cou</li>
        <li>Ne donnez rien à manger ni à boire</li>
        <li>Ne donnez aucun médicament</li>
        <li>Restez avec la personne et rassurez-la jusqu'à l'arrivée des secours</li>
      </ul>
      
      <h2>Traitements d'urgence</h2>
      <p>Plus le traitement est administré rapidement, plus les chances de récupération sont grandes:</p>
      <ul>
        <li><strong>Pour l'AVC ischémique</strong>: Thrombolyse (dissolution du caillot) si pratiquée dans les 4h30, thrombectomie mécanique (retrait du caillot) si possible dans les 6 heures</li>
        <li><strong>Pour l'AVC hémorragique</strong>: Contrôle de la pression artérielle, parfois intervention chirurgicale</li>
      </ul>
      
      <h2>Séquelles et rééducation</h2>
      <p>Les séquelles d'un AVC dépendent de la zone cérébrale touchée et du délai de prise en charge:</p>
      <ul>
        <li>Troubles moteurs (hémiplégie, hémiparésie)</li>
        <li>Troubles du langage (aphasie)</li>
        <li>Troubles de la déglutition (dysphagie)</li>
        <li>Troubles cognitifs</li>
        <li>Troubles visuels</li>
        <li>Troubles de l'humeur (dépression post-AVC)</li>
      </ul>
      
      <h2>L'accompagnement par Mylli Services après un AVC</h2>
      <p>Notre équipe spécialisée propose un accompagnement personnalisé:</p>
      <ul>
        <li>Aide aux gestes quotidiens</li>
        <li>Accompagnement aux séances de rééducation</li>
        <li>Adaptation du domicile pour prévenir les chutes</li>
        <li>Soutien psychologique pour le patient et ses proches</li>
        <li>Coordination avec les professionnels de santé</li>
      </ul>
      
      <p>Face à un AVC, chaque minute compte. Savoir reconnaître les signes et agir rapidement peut sauver une vie et limiter les séquelles. N'hésitez pas à nous contacter pour toute question sur l'accompagnement post-AVC.</p>
    `,
    imageSrc: "https://img.freepik.com/photos-gratuite/femme-agee-s-inquiete-epidemie-coronavirus_53876-153461.jpg?semt=ais_items_boosted&w=740",
    imageAlt: "Urgence médicale AVC",
    category: "Urgences médicales",
    publishedDate: "2023-10-29",
    readTime: 7,
    author: "Dr. Marie Lefèvre"
  },
  {
    id: '6',
    title: "Parkinson: vivre avec la maladie et préserver l'autonomie",
    slug: "parkinson-vivre-avec-maladie-preserver-autonomie",
    excerpt: "La maladie de Parkinson affecte progressivement la mobilité et l'autonomie. Découvrez les stratégies pour mieux vivre avec cette pathologie au quotidien.",
    content: `
      <h2>Comprendre la maladie de Parkinson</h2>
      <p>La maladie de Parkinson est une affection neurodégénérative chronique qui touche principalement les personnes de plus de 60 ans. Elle est causée par la destruction progressive des neurones produisant la dopamine, un neurotransmetteur essentiel au contrôle des mouvements. Cette maladie évolue lentement et affecte chaque personne différemment.</p>
      
      <h2>Les symptômes caractéristiques</h2>
      <p>La maladie de Parkinson se manifeste par une triade de symptômes moteurs:</p>
      <ul>
        <li><strong>Le tremblement de repos</strong>: Généralement asymétrique, touchant d'abord les mains ou les pieds</li>
        <li><strong>La rigidité musculaire</strong>: Sensation de raideur dans les membres</li>
        <li><strong>L'akinésie/bradykinésie</strong>: Difficulté à initier les mouvements et lenteur d'exécution</li>
      </ul>
      
      <p>D'autres symptômes peuvent également apparaître:</p>
      <ul>
        <li><strong>Troubles de la posture et de l'équilibre</strong>: Position voûtée, démarche à petits pas</li>
        <li><strong>Troubles non moteurs</strong>: Dépression, anxiété, troubles du sommeil, constipation, hypotension, troubles cognitifs</li>
        <li><strong>Modifications de l'écriture</strong>: Micrographie (écriture qui devient de plus en plus petite)</li>
        <li><strong>Troubles de la parole</strong>: Voix faible, monotone</li>
        <li><strong>Visage figé</strong>: Réduction des expressions faciales (hypomimie)</li>
      </ul>
      
      <h2>Traitements médicamenteux</h2>
      <p>Bien qu'il n'existe pas encore de traitement curatif, plusieurs options permettent de contrôler les symptômes:</p>
      <ul>
        <li><strong>Lévodopa</strong>: Le traitement de référence, transformée en dopamine dans le cerveau</li>
        <li><strong>Agonistes dopaminergiques</strong>: Stimulent directement les récepteurs à la dopamine</li>
        <li><strong>Inhibiteurs de la MAO-B et de la COMT</strong>: Ralentissent la dégradation de la dopamine</li>
        <li><strong>Anticholinergiques</strong>: Pour réduire les tremblements</li>
        <li><strong>Amantadine</strong>: Pour les mouvements anormaux induits par la lévodopa</li>
      </ul>
      
      <p>Dans certains cas, la stimulation cérébrale profonde peut être proposée lorsque les médicaments ne suffisent plus à contrôler les symptômes.</p>
      
      <h2>Préserver l'autonomie au quotidien</h2>
      <p>Plusieurs stratégies peuvent aider à maintenir une meilleure qualité de vie:</p>
      <ul>
        <li><strong>Activité physique régulière</strong>: Marche, natation, tai-chi, yoga, danse</li>
        <li><strong>Kinésithérapie</strong>: Exercices spécifiques pour maintenir la souplesse et l'équilibre</li>
        <li><strong>Orthophonie</strong>: Pour préserver la parole et la déglutition</li>
        <li><strong>Ergothérapie</strong>: Adaptation du domicile et apprentissage de techniques facilitant les gestes quotidiens</li>
        <li><strong>Soutien psychologique</strong>: Pour faire face à l'impact émotionnel de la maladie</li>
      </ul>
      
      <h2>Aménagements du domicile</h2>
      <p>Quelques modifications simples peuvent sécuriser l'environnement:</p>
      <ul>
        <li>Installation de barres d'appui dans la salle de bain et les toilettes</li>
        <li>Retrait des tapis et obstacles au sol</li>
        <li>Amélioration de l'éclairage</li>
        <li>Ustensiles adaptés dans la cuisine (couverts à manche épais, tasses avec grande anse)</li>
        <li>Chaises plus hautes avec accoudoirs</li>
      </ul>
      
      <h2>Alimentation et hydratation</h2>
      <p>Une alimentation adaptée est importante:</p>
      <ul>
        <li>Repas fractionnés en cas de fatigue</li>
        <li>Aliments riches en fibres pour lutter contre la constipation</li>
        <li>Hydratation suffisante (1,5L d'eau par jour minimum)</li>
        <li>Attention aux interactions entre protéines et lévodopa (espacement recommandé)</li>
      </ul>
      
      <h2>L'accompagnement par Mylli Services</h2>
      <p>Notre équipe spécialisée propose:</p>
      <ul>
        <li>Aide aux activités quotidiennes (toilette, habillage, repas)</li>
        <li>Accompagnement aux rendez-vous médicaux</li>
        <li>Stimulation cognitive et physique adaptée</li>
        <li>Soutien aux aidants familiaux</li>
        <li>Mise en place d'un environnement sécurisé</li>
      </ul>
      
      <p>Vivre avec la maladie de Parkinson représente un défi, mais avec un accompagnement adapté et des stratégies appropriées, il est possible de maintenir une bonne qualité de vie pendant de nombreuses années. N'hésitez pas à nous contacter pour mettre en place un plan d'accompagnement personnalisé.</p>
    `,
    imageSrc: "https://img.freepik.com/free-vector/parkinson-disease-abstract-concept-vector-illustration-parkinson-cause-treatment-age-depression-problem-disease-symptoms-progressive-nervous-system-disorder-tremor-abstract-metaphor_335657-1560.jpg?semt=ais_hybrid&w=740",
    imageAlt: "Accompagnement de personne atteinte de Parkinson",
    category: "Maladies neurodégénératives",
    publishedDate: "2023-12-18",
    readTime: 8,
    author: "Dr. Philippe Renard"
  },
  {
    id: '7',
    title: "Les soins palliatifs: accompagner avec dignité et humanité",
    slug: "soins-palliatifs-accompagner-dignite-humanite",
    excerpt: "Les soins palliatifs visent à améliorer la qualité de vie des patients en fin de vie et de leurs proches. Découvrez cette approche humaine et bienveillante.",
    content: `
      <h2>Qu'est-ce que les soins palliatifs?</h2>
      <p>Les soins palliatifs constituent une approche qui améliore la qualité de vie des patients et de leur famille, face aux conséquences d'une maladie potentiellement mortelle, par la prévention et le soulagement de la souffrance, grâce à une identification précoce et à une évaluation impeccable et au traitement de la douleur et des autres problèmes physiques, psychosociaux et spirituels.</p>
      
      <h2>Les principes fondamentaux</h2>
      <p>Les soins palliatifs reposent sur plusieurs principes essentiels:</p>
      <ul>
        <li><strong>Soulagement de la douleur</strong>: Contrôle optimal des symptômes physiques</li>
        <li><strong>Respect de la dignité</strong>: Préservation de l'autonomie et des choix du patient</li>
        <li><strong>Approche globale</strong>: Prise en compte des dimensions physique, psychologique, sociale et spirituelle</li>
        <li><strong>Accompagnement familial</strong>: Soutien aux proches pendant la maladie et le deuil</li>
        <li><strong>Travail en équipe</strong>: Collaboration interdisciplinaire pour une prise en charge optimale</li>
      </ul>
      
      <h2>Les différents types de soins palliatifs</h2>
      <p>Les soins palliatifs peuvent être dispensés dans différents contextes:</p>
      <ul>
        <li><strong>Soins palliatifs à domicile</strong>: Permettent au patient de rester dans son environnement familier</li>
        <li><strong>Unités de soins palliatifs</strong>: Services hospitaliers spécialisés</li>
        <li><strong>Équipes mobiles</strong>: Interviennent dans différents services de l'hôpital</li>
        <li><strong>Maisons de soins palliatifs</strong>: Structures alternatives à l'hospitalisation</li>
      </ul>
      
      <h2>La gestion de la douleur</h2>
      <p>Le contrôle de la douleur est un élément central des soins palliatifs:</p>
      <ul>
        <li><strong>Évaluation régulière</strong>: Utilisation d'échelles de douleur adaptées</li>
        <li><strong>Traitements médicamenteux</strong>: Antalgiques, morphiniques selon les besoins</li>
        <li><strong>Méthodes non médicamenteuses</strong>: Relaxation, massage, musicothérapie</li>
        <li><strong>Adaptation personnalisée</strong>: Ajustement selon l'évolution et les préférences du patient</li>
      </ul>
      
      <h2>Le soutien psychologique et spirituel</h2>
      <p>Les soins palliatifs incluent un accompagnement psychologique et spirituel:</p>
      <ul>
        <li><strong>Écoute active</strong>: Permettre l'expression des émotions et des peurs</li>
        <li><strong>Soutien psychologique</strong>: Aide pour faire face à l'angoisse et à la dépression</li>
        <li><strong>Accompagnement spirituel</strong>: Respect des croyances et des valeurs du patient</li>
        <li><strong>Préparation au départ</strong>: Aide pour les derniers souhaits et la réconciliation</li>
      </ul>
      
      <h2>L'accompagnement des familles</h2>
      <p>Les proches font partie intégrante de la prise en charge palliative:</p>
      <ul>
        <li><strong>Information et communication</strong>: Explication claire de la situation et des soins</li>
        <li><strong>Formation aux gestes de confort</strong>: Apprentissage des soins de base</li>
        <li><strong>Soutien émotionnel</strong>: Aide pour gérer l'angoisse et l'épuisement</li>
        <li><strong>Accompagnement du deuil</strong>: Suivi après le décès</li>
      </ul>
      
      <h2>Les défis des soins palliatifs à domicile</h2>
      <p>Maintenir un patient en soins palliatifs à domicile nécessite:</p>
      <ul>
        <li><strong>Organisation rigoureuse</strong>: Coordination entre les différents intervenants</li>
        <li><strong>Disponibilité 24h/24</strong>: Possibilité d'intervention d'urgence</li>
        <li><strong>Matériel adapté</strong>: Lit médicalisé, système d'oxygène si nécessaire</li>
        <li><strong>Formation des aidants</strong>: Apprentissage des gestes essentiels</li>
      </ul>
      
      <h2>L'éthique en soins palliatifs</h2>
      <p>Les soins palliatifs soulèvent des questions éthiques importantes:</p>
      <ul>
        <li><strong>Respect de l'autonomie</strong>: Droit du patient à participer aux décisions</li>
        <li><strong>Vérité et information</strong>: Droit de savoir ou de ne pas savoir</li>
        <li><strong>Proportionnalité des soins</strong>: Éviter l'acharnement thérapeutique</li>
        <li><strong>Dignité jusqu'au bout</strong>: Maintien de la qualité de vie</li>
      </ul>
      
      <h2>L'accompagnement par Mylli Services</h2>
      <p>Notre équipe spécialisée en soins palliatifs propose:</p>
      <ul>
        <li>Soins de confort et de bien-être</li>
        <li>Surveillance médicale continue</li>
        <li>Soutien psychologique pour le patient et sa famille</li>
        <li>Coordination avec l'équipe médicale</li>
        <li>Accompagnement dans les derniers moments</li>
      </ul>
      
      <p>Les soins palliatifs représentent l'essence même de l'humanité en médecine. Ils permettent d'accompagner chaque personne vers une fin de vie digne, apaisée et entourée de l'amour de ses proches. Notre équipe s'engage à offrir cet accompagnement avec le plus grand respect et la plus grande compassion.</p>
    `,
    imageSrc: "/lovable-uploads/dc40d7ba-e017-4b5e-aabc-071e8f563810.png",
    imageAlt: "Soins palliatifs avec accompagnement bienveillant",
    category: "Soins spécialisés",
    publishedDate: "2024-03-12",
    readTime: 10,
    author: "Dr. Amina Benali"
  },
  {
    id: '8',
    title: "L'oncologie: accompagner les patients atteints de cancer",
    slug: "oncologie-accompagner-patients-cancer",
    excerpt: "L'accompagnement des patients atteints de cancer nécessite une approche globale et personnalisée. Découvrez nos services d'aide et de soutien.",
    content: `
      <h2>L'oncologie: une spécialité complexe</h2>
      <p>L'oncologie est la spécialité médicale qui étudie et traite les cancers. Le cancer est une maladie caractérisée par la prolifération anormale de cellules qui envahissent les tissus voisins et peuvent se propager dans l'organisme. Cette pathologie complexe nécessite une prise en charge multidisciplinaire et un accompagnement personnalisé.</p>
      
      <h2>Les différents types de cancer</h2>
      <p>Il existe de nombreux types de cancer, classés selon plusieurs critères:</p>
      <ul>
        <li><strong>Cancer solides</strong>: Tumeurs du sein, du poumon, du côlon, de la prostate...</li>
        <li><strong>Cancers hématologiques</strong>: Leucémies, lymphomes, myélomes</li>
        <li><strong>Cancers rares</strong>: Sarcomes, tumeurs neuroendocrines</li>
        <li><strong>Cancers pédiatriques</strong>: Spécificités de l'enfant et de l'adolescent</li>
      </ul>
      
      <h2>Les traitements en oncologie</h2>
      <p>La prise en charge du cancer fait appel à plusieurs modalités thérapeutiques:</p>
      <ul>
        <li><strong>Chirurgie</strong>: Ablation de la tumeur et des tissus environnants</li>
        <li><strong>Chimiothérapie</strong>: Médicaments qui détruisent les cellules cancéreuses</li>
        <li><strong>Radiothérapie</strong>: Rayons à haute énergie dirigés vers la tumeur</li>
        <li><strong>Immunothérapie</strong>: Stimulation du système immunitaire contre le cancer</li>
        <li><strong>Thérapies ciblées</strong>: Médicaments qui s'attaquent à des anomalies spécifiques</li>
        <li><strong>Hormonothérapie</strong>: Blocage des hormones qui favorisent certains cancers</li>
      </ul>
      
      <h2>Les effets secondaires des traitements</h2>
      <p>Les traitements contre le cancer peuvent provoquer divers effets secondaires:</p>
      <ul>
        <li><strong>Fatigue</strong>: Épuisement physique et psychologique</li>
        <li><strong>Nausées et vomissements</strong>: Liés à la chimiothérapie</li>
        <li><strong>Perte de cheveux</strong>: Alopécie temporaire ou définitive</li>
        <li><strong>Troubles digestifs</strong>: Diarrhées, constipation, mucites</li>
        <li><strong>Immunodépression</strong>: Risque accru d'infections</li>
        <li><strong>Troubles de l'humeur</strong>: Anxiété, dépression</li>
      </ul>
      
      <h2>L'importance du soutien psychologique</h2>
      <p>Le diagnostic de cancer représente un bouleversement majeur:</p>
      <ul>
        <li><strong>Choc du diagnostic</strong>: Aide pour accepter et comprendre la maladie</li>
        <li><strong>Gestion de l'anxiété</strong>: Techniques de relaxation et de gestion du stress</li>
        <li><strong>Maintien de l'estime de soi</strong>: Face aux changements physiques</li>
        <li><strong>Communication familiale</strong>: Aide pour parler de la maladie avec les proches</li>
        <li><strong>Projet de vie</strong>: Redéfinition des priorités et des objectifs</li>
      </ul>
      
      <h2>La nutrition pendant le traitement</h2>
      <p>Une alimentation adaptée est cruciale pendant les traitements:</p>
      <ul>
        <li><strong>Maintien du poids</strong>: Prévention de la dénutrition</li>
        <li><strong>Renforcement immunitaire</strong>: Aliments riches en vitamines et minéraux</li>
        <li><strong>Gestion des nausées</strong>: Aliments faciles à digérer</li>
        <li><strong>Hydratation</strong>: Compensation des pertes liées aux traitements</li>
        <li><strong>Adaptation aux goûts</strong>: Modification des saveurs due aux traitements</li>
      </ul>
      
      <h2>L'activité physique adaptée</h2>
      <p>L'exercice physique présente de nombreux bénéfices:</p>
      <ul>
        <li><strong>Réduction de la fatigue</strong>: Amélioration de l'endurance</li>
        <li><strong>Maintien de la masse musculaire</strong>: Prévention de la fonte musculaire</li>
        <li><strong>Bien-être psychologique</strong>: Libération d'endorphines</li>
        <li><strong>Amélioration du sommeil</strong>: Meilleure qualité de repos</li>
        <li><strong>Renforcement immunitaire</strong>: Stimulation des défenses naturelles</li>
      </ul>
      
      <h2>Le retour à domicile</h2>
      <p>Le maintien ou le retour à domicile nécessite une organisation particulière:</p>
      <ul>
        <li><strong>Aménagement du logement</strong>: Adaptation aux limitations temporaires</li>
        <li><strong>Surveillance médicale</strong>: Suivi des constantes et des symptômes</li>
        <li><strong>Gestion des traitements</strong>: Aide à la prise de médicaments</li>
        <li><strong>Soins de confort</strong>: Hygiène, mobilisation, prévention des escarres</li>
        <li><strong>Soutien familial</strong>: Formation et accompagnement des proches</li>
      </ul>
      
      <h2>L'accompagnement par Mylli Services</h2>
      <p>Notre équipe spécialisée en oncologie propose:</p>
      <ul>
        <li>Soins infirmiers spécialisés à domicile</li>
        <li>Accompagnement aux séances de chimiothérapie</li>
        <li>Surveillance des effets secondaires</li>
        <li>Soutien nutritionnel et aide aux repas</li>
        <li>Accompagnement psychologique</li>
        <li>Coordination avec l'équipe médicale</li>
      </ul>
      
      <p>L'accompagnement d'un patient atteint de cancer est un défi qui mobilise toutes nos compétences humaines et techniques. Notre objectif est de permettre aux patients de traverser cette épreuve avec le maximum de confort, de dignité et d'espoir, entourés de leurs proches dans un environnement familier.</p>
    `,
    imageSrc: "/lovable-uploads/f90ed46f-8601-43f7-8480-fa93661cb1ff.png",
    imageAlt: "Accompagnement en oncologie",
    category: "Soins spécialisés",
    publishedDate: "2024-02-28",
    readTime: 12,
    author: "Dr. Hassan Alaoui"
  },
  {
    id: '9',
    title: "Maladie de Charcot (SLA): comprendre et accompagner",
    slug: "maladie-charcot-sla-comprendre-accompagner",
    excerpt: "La sclérose latérale amyotrophique (SLA) ou maladie de Charcot est une maladie neurodégénérative grave. Découvrez comment accompagner les patients et leurs familles.",
    content: `
      <h2>Qu'est-ce que la maladie de Charcot?</h2>
      <p>La sclérose latérale amyotrophique (SLA), également appelée maladie de Charcot, est une maladie neurodégénérative qui affecte les neurones moteurs. Ces cellules nerveuses contrôlent les mouvements volontaires des muscles. Leur dégénérescence progressive entraîne une faiblesse musculaire qui s'étend graduellement à l'ensemble du corps.</p>
      
      <h2>Les premiers signes de la maladie</h2>
      <p>Les symptômes initiaux de la SLA peuvent être subtils et variés:</p>
      <ul>
        <li><strong>Faiblesse musculaire</strong>: Généralement asymétrique, touchant d'abord les mains, les bras ou les jambes</li>
        <li><strong>Crampes et fasciculations</strong>: Contractions involontaires des muscles</li>
        <li><strong>Troubles de la dextérité</strong>: Difficulté à manipuler des objets fins</li>
        <li><strong>Troubles de l'élocution</strong>: Dysarthrie, voix enrouée</li>
        <li><strong>Troubles de la déglutition</strong>: Difficultés à avaler</li>
        <li><strong>Raideur musculaire</strong>: Spasticité progressive</li>
      </ul>
      
      <h2>L'évolution de la maladie</h2>
      <p>La SLA évolue de manière progressive et irréversible:</p>
      <ul>
        <li><strong>Phase précoce</strong>: Atteinte localisée, maintien de l'autonomie</li>
        <li><strong>Phase intermédiaire</strong>: Extension des symptômes, besoin d'aides techniques</li>
        <li><strong>Phase avancée</strong>: Atteinte respiratoire, dépendance totale</li>
        <li><strong>Préservation cognitive</strong>: L'intelligence reste généralement intacte</li>
      </ul>
      
      <h2>Le diagnostic de la SLA</h2>
      <p>Le diagnostic repose sur plusieurs examens:</p>
      <ul>
        <li><strong>Examen clinique</strong>: Évaluation neurologique approfondie</li>
        <li><strong>Électromyographie (EMG)</strong>: Mesure de l'activité électrique des muscles</li>
        <li><strong>IRM cérébrale et médullaire</strong>: Élimination d'autres pathologies</li>
        <li><strong>Analyses sanguines</strong>: Recherche de causes alternatives</li>
        <li><strong>Biopsie musculaire</strong>: Parfois nécessaire pour confirmer le diagnostic</li>
      </ul>
      
      <h2>Les traitements disponibles</h2>
      <p>Bien qu'il n'existe pas de traitement curatif, plusieurs approches peuvent ralentir l'évolution:</p>
      <ul>
        <li><strong>Riluzole</strong>: Seul médicament ayant montré une efficacité modeste</li>
        <li><strong>Edaravone</strong>: Antioxydant utilisé dans certains cas</li>
        <li><strong>Traitements symptomatiques</strong>: Gestion de la spasticité, des crampes, de la salivation</li>
        <li><strong>Soutien nutritionnel</strong>: Gastrostomie en cas de troubles de déglutition</li>
        <li><strong>Assistance respiratoire</strong>: Ventilation non invasive puis invasive</li>
      </ul>
      
      <h2>La prise en charge multidisciplinaire</h2>
      <p>L'accompagnement de la SLA nécessite une équipe pluridisciplinaire:</p>
      <ul>
        <li><strong>Neurologue</strong>: Suivi médical et ajustement des traitements</li>
        <li><strong>Kinésithérapeute</strong>: Maintien de la mobilité et prévention des contractures</li>
        <li><strong>Orthophoniste</strong>: Travail sur la parole et la déglutition</li>
        <li><strong>Ergothérapeute</strong>: Adaptation du domicile et aides techniques</li>
        <li><strong>Diététicien</strong>: Maintien d'un état nutritionnel optimal</li>
        <li><strong>Psychologue</strong>: Soutien émotionnel pour le patient et sa famille</li>
      </ul>
      
      <h2>Les aides techniques et l'adaptation</h2>
      <p>De nombreuses aides peuvent améliorer la qualité de vie:</p>
      <ul>
        <li><strong>Aides à la mobilité</strong>: Cannes, déambulateurs, fauteuils roulants</li>
        <li><strong>Aides techniques</strong>: Systèmes de communication assistée, ordinateurs adaptés</li>
        <li><strong>Aménagement du domicile</strong>: Plans inclinés, barres d'appui, lit médicalisé</li>
        <li><strong>Matériel respiratoire</strong>: Aspirateur de sécrétions, ventilateur</li>
      </ul>
      
      <h2>Le soutien psychologique</h2>
      <p>L'accompagnement psychologique est essentiel:</p>
      <ul>
        <li><strong>Acceptation du diagnostic</strong>: Aide pour traverser les différentes phases du deuil</li>
        <li><strong>Maintien de l'estime de soi</strong>: Valorisation des capacités préservées</li>
        <li><strong>Communication</strong>: Aide pour exprimer ses besoins et ses émotions</li>
        <li><strong>Projet de vie</strong>: Adaptation des objectifs à l'évolution de la maladie</li>
        <li><strong>Préparation aux directives anticipées</strong>: Réflexion sur les souhaits de fin de vie</li>
      </ul>
      
      <h2>L'impact sur la famille</h2>
      <p>La SLA affecte profondément l'entourage familial:</p>
      <ul>
        <li><strong>Burden de l'aidant</strong>: Charge physique et émotionnelle croissante</li>
        <li><strong>Réorganisation familiale</strong>: Adaptation des rôles et des responsabilités</li>
        <li><strong>Soutien aux enfants</strong>: Aide pour comprendre et faire face à la maladie</li>
        <li><strong>Épuisement des aidants</strong>: Nécessité de prendre du répit</li>
      </ul>
      
      <h2>L'accompagnement par Mylli Services</h2>
      <p>Notre équipe spécialisée dans la SLA propose:</p>
      <ul>
        <li>Soins spécialisés adaptés à l'évolution de la maladie</li>
        <li>Aide aux gestes de la vie quotidienne</li>
        <li>Surveillance respiratoire et gestion des sécrétions</li>
        <li>Soutien nutritionnel et aide à l'alimentation</li>
        <li>Accompagnement psychologique du patient et de sa famille</li>
        <li>Coordination avec l'équipe médicale pluridisciplinaire</li>
        <li>Formation des aidants familiaux</li>
      </ul>
      
      <p>La maladie de Charcot représente l'un des défis les plus difficiles en neurologie. Notre engagement est d'accompagner chaque patient et sa famille avec le maximum de compétence, de compassion et de respect, en préservant la dignité et la qualité de vie à chaque étape de cette épreuve.</p>
    `,
    imageSrc: "https://cdn.prod.website-files.com/67339337c86ebb786697e68c/6839a2881b88b0792ccdcf15_image%20(4)%20(1).png",
    imageAlt: "Accompagnement neurologique spécialisé",
    category: "Maladies neurodégénératives",
    publishedDate: "2024-01-25",
    readTime: 11,
    author: "Dr. Rachid Tazi"
  }
];

export const getArticleBySlug = (slug: string): Article | undefined => {
  return articles.find(article => article.slug === slug);
};

export const getRelatedArticles = (currentSlug: string, limit = 3): Article[] => {
  return articles
    .filter(article => article.slug !== currentSlug)
    .slice(0, limit);
};

// Helper function to get all available categories
export const getCategories = (): { name: string; value: string; count: number }[] => {
  const categoriesMap = articles.reduce((acc, article) => {
    const category = article.category;
    acc[category] = (acc[category] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return Object.entries(categoriesMap).map(([category, count]) => ({
    name: category,
    value: category.toLowerCase().replace(/\s+/g, '-'),
    count
  }));
};
