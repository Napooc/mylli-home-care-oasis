import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import ServiceCard from '@/components/common/ServiceCard';
import ServiceIcon from '@/components/common/ServiceIcon';
import PageBanner from '@/components/common/PageBanner';
import { useTranslation } from 'react-i18next';

const Home = () => {
  const { t } = useTranslation();

  return (
    <div>
      {/* Hero Section */}
      <PageBanner
        title={t('hero.title')}
        subtitle={t('hero.subtitle')}
        className="mb-12 md:mb-24"
      >
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
          <Link
            to="/services/infirmier"
            className="group relative bg-white/95 backdrop-blur-sm text-mylli-primary px-8 py-4 rounded-full font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-mylli-primary/20 min-w-[280px] flex items-center justify-center"
          >
            <svg className="w-6 h-6 mr-3 group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
              <circle cx="12" cy="12" r="3" />
            </svg>
            <span>Services Infirmier</span>
            <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>

          <Link
            to="/services/aide-soignant"
            className="group relative bg-mylli-primary text-white px-8 py-4 rounded-full font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 min-w-[280px] flex items-center justify-center"
          >
            <svg className="w-6 h-6 mr-3 group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              <path d="M8 14s1.5 2 4 2 4-2 4-2" />
            </svg>
            <span>Services Aide-Soignant</span>
            <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </PageBanner>

      {/* Services Section */}
      <section className="container-custom py-16 md:py-24">
        <motion.div 
          className="text-center mb-12 md:mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-mylli-dark mb-4">
            {t('services.title')}
          </h2>
          <p className="text-mylli-gray text-lg max-w-2xl mx-auto">
            {t('services.subtitle')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <motion.div
            className="col-span-1"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <ServiceCard
              title={t('services.infirmier.title')}
              description={t('services.infirmier.description')}
              detailedDescription={t('services.infirmier.detailedDescription')}
              icon={<ServiceIcon type="infirmier" size={40} />}
              link="/services/infirmier"
              style="modern"
            />
          </motion.div>

          <motion.div
            className="col-span-1"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <ServiceCard
              title={t('services.aideSoignant.title')}
              description={t('services.aideSoignant.description')}
              detailedDescription={t('services.aideSoignant.detailedDescription')}
              icon={<ServiceIcon type="aide-soignant" size={40} />}
              link="/services/aide-soignant"
              style="modern"
            />
          </motion.div>

          <motion.div
            className="col-span-1"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <ServiceCard
              title={t('services.gardeMalade.title')}
              description={t('services.gardeMalade.description')}
              detailedDescription={t('services.gardeMalade.detailedDescription')}
              icon={<ServiceIcon type="garde-malade" size={40} />}
              link="/services/garde-malade"
              style="modern"
            />
          </motion.div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="bg-mylli-light py-16 md:py-24">
        <div className="container-custom">
          <motion.div 
            className="text-center mb-12 md:mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-mylli-dark mb-4">
              {t('whyChooseUs.title')}
            </h2>
            <p className="text-mylli-gray text-lg max-w-2xl mx-auto">
              {t('whyChooseUs.subtitle')}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <motion.div
              className="col-span-1"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <ServiceCard
                title={t('whyChooseUs.quality.title')}
                description={t('whyChooseUs.quality.description')}
                icon={<Sparkles size={40} className="text-mylli-primary" />}
                style="minimal"
              />
            </motion.div>

            <motion.div
              className="col-span-1"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <ServiceCard
                title={t('whyChooseUs.experience.title')}
                description={t('whyChooseUs.experience.description')}
                icon={<Sparkles size={40} className="text-mylli-primary" />}
                style="minimal"
              />
            </motion.div>

            <motion.div
              className="col-span-1"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <ServiceCard
                title={t('whyChooseUs.personalized.title')}
                description={t('whyChooseUs.personalized.description')}
                icon={<Sparkles size={40} className="text-mylli-primary" />}
                style="minimal"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="container-custom py-16 md:py-24 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-mylli-dark mb-4">
            {t('cta.title')}
          </h2>
          <p className="text-mylli-gray text-lg max-w-2xl mx-auto mb-8">
            {t('cta.subtitle')}
          </p>
          <Link
            to="/contact"
            className="btn-primary"
          >
            {t('cta.button')}
          </Link>
        </motion.div>
      </section>
    </div>
  );
};

export default Home;
