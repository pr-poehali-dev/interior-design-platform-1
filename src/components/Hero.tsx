import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

interface HeroProps {
  onNavigate: (section: string) => void;
}

export default function Hero({ onNavigate }: HeroProps) {
  return (
    <section className="relative min-h-screen flex items-center pt-20">
      <div className="container mx-auto px-6 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="animate-fade-in">
            <h2 className="text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
              Профессиональный дизайн интерьера онлайн
            </h2>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              Создавайте проекты помещений в интерактивном редакторе. 
              Размещайте мебель, подбирайте материалы и визуализируйте идеи в реальном времени.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button 
                size="lg" 
                onClick={() => onNavigate('editor')}
                className="text-base"
              >
                Открыть редактор
                <Icon name="ArrowRight" size={20} className="ml-2" />
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                onClick={() => onNavigate('services')}
                className="text-base"
              >
                Узнать больше
              </Button>
            </div>

            <div className="grid grid-cols-3 gap-8 mt-12 pt-12 border-t border-border">
              <div>
                <div className="text-3xl font-bold text-primary mb-2">500+</div>
                <div className="text-sm text-muted-foreground">Элементов</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary mb-2">3D</div>
                <div className="text-sm text-muted-foreground">Визуализация</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary mb-2">24/7</div>
                <div className="text-sm text-muted-foreground">Доступность</div>
              </div>
            </div>
          </div>

          <div className="relative animate-scale-in">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent rounded-3xl blur-3xl"></div>
            <img 
              src="https://cdn.poehali.dev/projects/5de315d4-d4c2-4545-b2ff-d47b9024142e/files/4c21d021-0416-4fa8-bd24-e9e40dabe87d.jpg"
              alt="Современный интерьер"
              className="relative rounded-3xl shadow-2xl w-full h-auto"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
