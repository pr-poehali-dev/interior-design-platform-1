import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

const services = [
  {
    icon: 'Paintbrush',
    title: 'Визуализация интерьера',
    description: 'Создавайте реалистичные 3D-визуализации вашего будущего пространства с детальной проработкой материалов и освещения',
  },
  {
    icon: 'Layers',
    title: 'Планировка помещений',
    description: 'Разрабатывайте функциональные планировки с учетом эргономики и оптимального использования пространства',
  },
  {
    icon: 'Palette',
    title: 'Подбор материалов',
    description: 'Обширная библиотека материалов, текстур и отделочных покрытий для создания уникального стиля',
  },
  {
    icon: 'Sofa',
    title: 'Каталог мебели',
    description: 'Более 500 элементов мебели и декора от ведущих производителей с точными размерами и характеристиками',
  },
  {
    icon: 'Lightbulb',
    title: 'Сценарии освещения',
    description: 'Моделирование естественного и искусственного освещения для создания идеальной атмосферы',
  },
  {
    icon: 'Share2',
    title: 'Экспорт проектов',
    description: 'Выгрузка проектов в различных форматах для презентации клиентам и передачи подрядчикам',
  },
];

const features = [
  { label: 'Облачное хранилище', value: 'Неограниченно' },
  { label: 'Библиотека элементов', value: '500+ предметов' },
  { label: 'Экспорт проектов', value: 'PDF, PNG, 3D' },
  { label: 'Техподдержка', value: '24/7' },
];

export default function Services() {
  return (
    <section className="min-h-screen py-24 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-4">Наши возможности</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Профессиональные инструменты для создания проектов интерьера любой сложности
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {services.map((service, index) => (
            <Card 
              key={index} 
              className="p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <Icon name={service.icon as any} size={24} className="text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">
                {service.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {service.description}
              </p>
            </Card>
          ))}
        </div>

        <Card className="p-8 lg:p-12 bg-gradient-to-br from-primary/5 to-transparent border-primary/20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-3xl font-bold text-foreground mb-4">
                Все инструменты в одном месте
              </h3>
              <p className="text-lg text-muted-foreground mb-6">
                Профессиональная платформа для дизайнеров интерьера с полным набором функций для реализации проектов любой сложности
              </p>
              <div className="space-y-4">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-center justify-between py-3 border-b border-border last:border-0">
                    <span className="text-foreground font-medium">{feature.label}</span>
                    <span className="text-primary font-semibold">{feature.value}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent rounded-3xl blur-3xl"></div>
              <img 
                src="https://cdn.poehali.dev/projects/5de315d4-d4c2-4545-b2ff-d47b9024142e/files/a07b6b43-13aa-4873-bcd7-a14cff7090d9.jpg"
                alt="Рабочее пространство дизайнера"
                className="relative rounded-2xl shadow-xl w-full h-auto"
              />
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
}
