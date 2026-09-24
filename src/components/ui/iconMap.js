// Peta ikon eksplisit agar bundler bisa tree-shake (lucide-react punya ribuan ekspor).
// Tambahkan di sini bila src/data memakai nama ikon baru.
// Nama harus sama dengan yang dipakai di src/data/*.js.
import {
  Atom,
  Braces,
  Brain,
  Briefcase,
  Database,
  GitBranch,
  HelpCircle,
  Home,
  LayoutGrid,
  Mail,
  NotebookPen,
  Paintbrush,
  PenTool,
  ScatterChart,
  Send,
  Server,
  Sparkles,
  StickyNote,
  Table,
  User,
  Zap,
} from 'lucide-react'
import { Excel, Python, Github } from './BrandIcons'

export const ICONS = {
  Atom,
  Braces,
  Brain,
  Briefcase,
  Database,
  Excel,
  GitBranch,
  Github,
  Home,
  LayoutGrid,
  Mail,
  NotebookPen,
  Paintbrush,
  PenTool,
  Python,
  ScatterChart,
  Send,
  Server,
  Sparkles,
  StickyNote,
  Table,
  User,
  Zap,
}

export const FALLBACK_ICON = HelpCircle
