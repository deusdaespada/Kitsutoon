import { Component, ErrorInfo, ReactNode } from 'react';
import { Button } from '@/components/ui/button';

interface Props {
  children: ReactNode;
  /** Quando este valor muda (ex.: a rota), o erro é limpo automaticamente. */
  resetKey?: string;
}

interface State {
  error: Error | null;
}

class ErrorBoundary extends Component<Props, State> {
  state: State = { error: null };

  static getDerivedStateFromError(error: Error): State {
    return { error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('[ErrorBoundary]', error, info.componentStack);
  }

  componentDidUpdate(prev: Props) {
    if (this.state.error && prev.resetKey !== this.props.resetKey) {
      this.setState({ error: null });
    }
  }

  render() {
    if (!this.state.error) return this.props.children;

    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4" role="alert">
        <div className="max-w-md text-center space-y-4">
          <h1 className="text-2xl font-black text-foreground">Algo deu errado</h1>
          <p className="text-sm text-muted-foreground">
            Ocorreu um erro inesperado ao carregar esta página. Tente novamente ou volte ao início.
          </p>
          <div className="flex items-center justify-center gap-2">
            <Button onClick={() => this.setState({ error: null })}>Tentar novamente</Button>
            <Button variant="outline" onClick={() => window.location.assign('/')}>
              Ir para o início
            </Button>
          </div>
        </div>
      </div>
    );
  }
}

export default ErrorBoundary;
