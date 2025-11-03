import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

interface HeaderProps {
  activeSection: string;
  onNavigate: (section: string) => void;
}

export default function Header({ activeSection, onNavigate }: HeaderProps) {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div 
            onClick={() => onNavigate('home')}
            className="flex items-center gap-2 cursor-pointer group"
          >
            <Icon name="Home" size={28} className="text-primary" />
            <h1 className="text-2xl font-bold text-foreground group-hover:text-primary transition-colors">
              DesignSpace
            </h1>
          </div>

          <nav className="hidden md:flex items-center gap-8">
            <button
              onClick={() => onNavigate('home')}
              className={`text-sm font-medium transition-colors ${
                activeSection === 'home' ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Главная
            </button>
            <button
              onClick={() => onNavigate('editor')}
              className={`text-sm font-medium transition-colors ${
                activeSection === 'editor' ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Редактор
            </button>
            <button
              onClick={() => onNavigate('services')}
              className={`text-sm font-medium transition-colors ${
                activeSection === 'services' ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Услуги
            </button>
          </nav>

          <Button onClick={() => onNavigate('editor')} className="hidden md:flex">
            Открыть редактор
          </Button>
        </div>
      </div>
    </header>
  );
}
