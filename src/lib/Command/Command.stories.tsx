import { useState } from 'react';
import { Compass, Calendar, Settings, FileText, Users } from 'lucide-react';
import { Command } from './Command';
import { Button } from '../Button/Button';

export default {
  title: 'Command',
};

const groups = [
  {
    heading: 'Navegação',
    items: [
      { id: '/aluno', label: 'Aluno · jornada', hint: 'progressão pessoal', icon: <Compass size={14} /> },
      { id: '/turma', label: 'Turma 2026.2', hint: '24 operadores ativos', icon: <Users size={14} /> },
      { id: '/calendario', label: 'Calendário', hint: 'lives e mentorias', icon: <Calendar size={14} /> },
    ],
  },
  {
    heading: 'Ações',
    items: [
      { id: 'new-note', label: 'Nova nota', shortcut: 'N', icon: <FileText size={14} /> },
      { id: 'settings', label: 'Configurações', shortcut: 'G S', icon: <Settings size={14} /> },
    ],
  },
];

export const Default = () => {
  const [open, setOpen] = useState(false);
  const [last, setLast] = useState<string | null>(null);
  return (
    <div style={{ padding: 24 }}>
      <Button onClick={() => setOpen(true)}>Abrir paleta · Cmd+K</Button>
      {last && <p style={{ marginTop: 16, fontSize: 13 }}>Selecionou: <code>{last}</code></p>}
      <Command
        open={open}
        onClose={() => setOpen(false)}
        groups={groups}
        onSelect={(id) => setLast(id)}
      />
    </div>
  );
};
