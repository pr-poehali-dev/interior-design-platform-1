import { useState } from 'react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import RoomEditor from '@/components/RoomEditor';
import Services from '@/components/Services';
import Icon from '@/components/ui/icon';

export default function Index() {
  const [activeSection, setActiveSection] = useState('home');

  const handleNavigate = (section: string) => {
    setActiveSection(section);
    if (section !== 'home') {
      document.getElementById(section)?.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen">
      <Header activeSection={activeSection} onNavigate={handleNavigate} />
      
      <div id="home">
        <Hero onNavigate={handleNavigate} />
      </div>
      
      <div id="editor">
        <RoomEditor />
      </div>
      
      <div id="services">
        <Services />
      </div>

      <footer className="bg-secondary text-secondary-foreground py-12">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Icon name="Home" size={24} />
                <h3 className="text-xl font-bold">DesignSpace</h3>
              </div>
              <p className="text-secondary-foreground/80">
                Профессиональная платформа для дизайна интерьеров
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Разделы</h4>
              <div className="space-y-2 text-secondary-foreground/80">
                <div className="cursor-pointer hover:text-secondary-foreground transition-colors" onClick={() => handleNavigate('home')}>
                  Главная
                </div>
                <div className="cursor-pointer hover:text-secondary-foreground transition-colors" onClick={() => handleNavigate('editor')}>
                  Редактор
                </div>
                <div className="cursor-pointer hover:text-secondary-foreground transition-colors" onClick={() => handleNavigate('services')}>
                  Услуги
                </div>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Контакты</h4>
              <div className="space-y-2 text-secondary-foreground/80">
                <div>info@designspace.ru</div>
                <div>+7 (495) 123-45-67</div>
              </div>
            </div>
          </div>
          <div className="border-t border-secondary-foreground/20 mt-8 pt-8 text-center text-secondary-foreground/60 text-sm">
            © 2024 DesignSpace. Все права защищены
          </div>
        </div>
      </footer>
    </div>
  );
}