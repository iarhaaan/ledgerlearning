import {

  CheckCircle2,
  XCircle,
  FileText,
  HelpCircle,
  Sun,
  Moon,
  Mail,
  ChevronDown,
  ChevronUp,
  Search,
  BookOpen,
  Terminal,
  Settings,
  GraduationCap,
  Folder,
  FolderOpen,
  Star,
  Linkedin,
  type LucideProps
} from 'lucide-react';

interface IconProps extends LucideProps {
  className?: string;
}

export const CheckCircleIcon = (props: IconProps) => <CheckCircle2 {...props} />;
export const XCircleIcon = (props: IconProps) => <XCircle {...props} />;
export const DocumentTextIcon = (props: IconProps) => <FileText {...props} />;
export const QuestionMarkCircleIcon = (props: IconProps) => <HelpCircle {...props} />;
export const SunIcon = (props: IconProps) => <Sun {...props} />;
export const MoonIcon = (props: IconProps) => <Moon {...props} />;
export const EnvelopeIcon = (props: IconProps) => <Mail {...props} />;
export const ChevronDownIcon = (props: IconProps) => <ChevronDown {...props} />;
export const ChevronUpIcon = (props: IconProps) => <ChevronUp {...props} />;
export const SearchIcon = (props: IconProps) => <Search {...props} />;
export const BookOpenIcon = (props: IconProps) => <BookOpen {...props} />;
export const CommandLineIcon = (props: IconProps) => <Terminal {...props} />;
export const WrenchScrewdriverIcon = (props: IconProps) => <Settings {...props} />;
export const AcademicCapIcon = (props: IconProps) => <GraduationCap {...props} />;
export const FolderIcon = (props: IconProps) => <Folder {...props} />;
export const FolderOpenIcon = (props: IconProps) => <FolderOpen {...props} />;
export const StarIcon = (props: IconProps) => <Star {...props} />;
export const LinkedInIcon = (props: IconProps) => <Linkedin {...props} />;