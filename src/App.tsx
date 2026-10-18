/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { HeroSection } from './components/home/HeroSection';
import { WakaGreeting } from './components/home/WakaGreeting';
import { FlagshipPrograms } from './components/home/FlagshipPrograms';
import { LatestNewsSection } from './components/home/LatestNewsSection';
import { FeaturedAchievements } from './components/home/FeaturedAchievements';
import { UpcomingAgendaSection } from './components/home/UpcomingAgendaSection';
import { ExtracurricularPreview } from './components/home/ExtracurricularPreview';
import { CtaBanner } from './components/home/CtaBanner';

// Pages
import { ProfilePage } from './components/pages/ProfilePage';
import { NewsPage } from './components/pages/NewsPage';
import { AgendaPage } from './components/pages/AgendaPage';
import { AchievementsPage } from './components/pages/AchievementsPage';
import { OsisMpkPage } from './components/pages/OsisMpkPage';
import { ExtracurricularPage } from './components/pages/ExtracurricularPage';
import { GalleryPage } from './components/pages/GalleryPage';
import { ContactPage } from './components/pages/ContactPage';

// Admin CMS
import { AdminPanel } from './components/admin/AdminPanel';
import { AdminLoginModal } from './components/admin/AdminLoginModal';

// Storage & Types
import { StorageService } from './services/storageService';
import { 
  AdminUser, 
  NewsItem, 
  AgendaItem, 
  AchievementItem, 
  ExtracurricularItem, 
  GalleryItem, 
  StudentAspiration, 
  ContactMessage, 
  SchoolProfileData 
} from './types';

export default function App() {
  const [currentTab, setCurrentTab] = useState<string>('beranda');
  
  // Data State
  const [profile, setProfile] = useState<SchoolProfileData>(() => StorageService.getProfile());
  const [news, setNews] = useState<NewsItem[]>(() => StorageService.getNews());
  const [agenda, setAgenda] = useState<AgendaItem[]>(() => StorageService.getAgenda());
  const [achievements, setAchievements] = useState<AchievementItem[]>(() => StorageService.getAchievements());
  const [extras, setExtras] = useState<ExtracurricularItem[]>(() => StorageService.getExtracurriculars());
  const [gallery, setGallery] = useState<GalleryItem[]>(() => StorageService.getGallery());
  const [aspirations, setAspirations] = useState<StudentAspiration[]>(() => StorageService.getAspirations());
  const [contacts, setContacts] = useState<ContactMessage[]>(() => StorageService.getContactMessages());
  
  // Admin & Modals
  const [currentAdmin, setCurrentAdmin] = useState<AdminUser | null>(() => StorageService.getCurrentAdmin());
  const [showAdminLoginModal, setShowAdminLoginModal] = useState<boolean>(false);
  const [showAdminPanel, setShowAdminPanel] = useState<boolean>(false);

  // Active modal items for readers
  const [selectedNewsArticle, setSelectedNewsArticle] = useState<NewsItem | null>(null);
  const [selectedAgendaItem, setSelectedAgendaItem] = useState<AgendaItem | null>(null);
  const [selectedAchievementItem, setSelectedAchievementItem] = useState<AchievementItem | null>(null);
  const [selectedExtraItem, setSelectedExtraItem] = useState<ExtracurricularItem | null>(null);

  const refreshData = () => {
    setProfile(StorageService.getProfile());
    setNews(StorageService.getNews());
    setAgenda(StorageService.getAgenda());
    setAchievements(StorageService.getAchievements());
    setExtras(StorageService.getExtracurriculars());
    setGallery(StorageService.getGallery());
    setAspirations(StorageService.getAspirations());
    setContacts(StorageService.getContactMessages());
    setCurrentAdmin(StorageService.getCurrentAdmin());
  };

  const handleNavigate = (tab: string) => {
    setCurrentTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // If in Admin CMS Mode
  if (showAdminPanel && currentAdmin) {
    return (
      <AdminPanel
        currentAdmin={currentAdmin}
        onLogout={() => {
          StorageService.logoutAdmin();
          setCurrentAdmin(null);
          setShowAdminPanel(false);
          refreshData();
        }}
        onClosePanel={() => setShowAdminPanel(false)}
        onDataChanged={refreshData}
        profile={profile}
        news={news}
        agenda={agenda}
        achievements={achievements}
        extras={extras}
        gallery={gallery}
        aspirations={aspirations}
        contacts={contacts}
      />
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800 font-sans antialiased selection:bg-amber-400/30 selection:text-amber-900">
      {/* Top Navigation */}
      <Navbar
        currentTab={currentTab}
        onNavigate={handleNavigate}
        onOpenAdminModal={() => setShowAdminLoginModal(true)}
        currentAdmin={currentAdmin}
        runningAnnouncement={profile.runningAnnouncement}
      />

      {/* Main Content Pages */}
      <main className="flex-1">
        {currentTab === 'beranda' && (
          <div>
            <HeroSection
              onExploreAgenda={() => handleNavigate('agenda')}
              onExploreAchievements={() => handleNavigate('prestasi')}
              onNavigate={handleNavigate}
            />
            <WakaGreeting
              profile={profile}
              onExploreProfile={() => handleNavigate('profil')}
            />
            <FlagshipPrograms onNavigate={handleNavigate} />
            <LatestNewsSection
              news={news}
              onSelectNews={(article) => {
                setSelectedNewsArticle(article);
                handleNavigate('berita');
              }}
              onExploreAll={() => handleNavigate('berita')}
            />
            <FeaturedAchievements
              achievements={achievements}
              onSelectAchievement={(ach) => {
                setSelectedAchievementItem(ach);
                handleNavigate('prestasi');
              }}
              onExploreAll={() => handleNavigate('prestasi')}
            />
            <UpcomingAgendaSection
              agenda={agenda}
              onSelectAgenda={(ag) => {
                setSelectedAgendaItem(ag);
                handleNavigate('agenda');
              }}
              onExploreAll={() => handleNavigate('agenda')}
            />
            <ExtracurricularPreview
              extras={extras}
              onSelectExtra={(ex) => {
                setSelectedExtraItem(ex);
                handleNavigate('ekstra');
              }}
              onExploreAll={() => handleNavigate('ekstra')}
            />
            <CtaBanner onNavigate={handleNavigate} />
          </div>
        )}

        {currentTab === 'profil' && (
          <ProfilePage
            profile={profile}
            onNavigate={handleNavigate}
          />
        )}

        {currentTab === 'berita' && (
          <NewsPage
            news={news}
            selectedArticle={selectedNewsArticle}
            onSelectArticle={setSelectedNewsArticle}
          />
        )}

        {currentTab === 'agenda' && (
          <AgendaPage
            agenda={agenda}
            selectedAgenda={selectedAgendaItem}
            onSelectAgenda={setSelectedAgendaItem}
          />
        )}

        {currentTab === 'prestasi' && (
          <AchievementsPage
            achievements={achievements}
            selectedAchievement={selectedAchievementItem}
            onSelectAchievement={setSelectedAchievementItem}
          />
        )}

        {currentTab === 'osis-mpk' && (
          <OsisMpkPage
            aspirations={aspirations}
            onAspirationSubmitted={refreshData}
          />
        )}

        {currentTab === 'ekstra' && (
          <ExtracurricularPage
            extras={extras}
            selectedExtra={selectedExtraItem}
            onSelectExtra={setSelectedExtraItem}
          />
        )}

        {currentTab === 'galeri' && (
          <GalleryPage
            gallery={gallery}
          />
        )}

        {currentTab === 'kontak' && (
          <ContactPage
            onMessageSent={refreshData}
          />
        )}
      </main>

      {/* Footer */}
      <Footer
        onNavigate={handleNavigate}
        onOpenAdminModal={() => setShowAdminLoginModal(true)}
      />

      {/* Admin Login Modal */}
      <AdminLoginModal
        isOpen={showAdminLoginModal}
        onClose={() => setShowAdminLoginModal(false)}
        onLoginSuccess={(user) => {
          setCurrentAdmin(user);
          setShowAdminLoginModal(false);
          setShowAdminPanel(true);
        }}
        currentAdmin={currentAdmin}
        onLogout={() => {
          StorageService.logoutAdmin();
          setCurrentAdmin(null);
          refreshData();
        }}
        onOpenPanel={() => {
          setShowAdminLoginModal(false);
          setShowAdminPanel(true);
        }}
      />
    </div>
  );
}
