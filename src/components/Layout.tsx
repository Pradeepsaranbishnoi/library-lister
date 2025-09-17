import { ReactNode } from 'react';
import { BookOpen } from 'lucide-react';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen">
      <header className="relative border-b border-border/20 glass-effect backdrop-blur-xl">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-accent/10"></div>
        <div className="relative container mx-auto px-6 py-6">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-primary rounded-xl blur-lg opacity-60 animate-glow"></div>
              <div className="relative flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-primary neon-glow">
                <BookOpen className="w-8 h-8 text-primary-foreground animate-float" />
              </div>
            </div>
            <div>
              <h1 className="text-2xl font-bold gradient-text">BookVault Pro</h1>
              <p className="text-sm text-muted-foreground">Advanced Library Management Suite</p>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-12">
        <div className="animate-slide-up">
          {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;