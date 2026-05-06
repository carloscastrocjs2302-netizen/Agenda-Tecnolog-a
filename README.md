# LearnScope 🎓

Plataforma de seguimiento académico para el área de Tecnología — Colegio Cafam.

## 📁 Estructura de archivos

```
learnscope/
├── index.html          ← App principal
├── manifest.json       ← Configuración PWA
├── sw.js               ← Service Worker (offline)
├── README.md
└── icons/
    ├── favicon.ico
    ├── favicon-16.png
    ├── favicon-32.png
    ├── icon-72.png
    ├── icon-96.png
    ├── icon-128.png
    ├── icon-144.png
    ├── icon-152.png
    ├── icon-192.png
    ├── icon-384.png
    ├── icon-512.png
    ├── apple-touch-icon.png
    ├── apple-touch-icon-120.png
    ├── apple-touch-icon-152.png
    ├── apple-touch-icon-167.png
    └── apple-touch-icon-180.png
```

## 🚀 Cómo subir a GitHub Pages

1. Crea un repositorio nuevo en GitHub (ej: `learnscope`)
2. Sube **todos los archivos** manteniendo la estructura de carpetas
3. Ve a **Settings → Pages → Source: main branch / root**
4. Tu app estará en: `https://tu-usuario.github.io/learnscope/`

## 📱 Instalar en el celular / iPad

### iPhone / iPad (Safari):
1. Abre la URL en Safari
2. Toca el botón de compartir ⬆️
3. Selecciona **"Agregar a pantalla de inicio"**
4. Toca **"Agregar"**

### Android (Chrome):
1. Abre la URL en Chrome
2. Toca el menú ⋮ o aparece un banner automático
3. Selecciona **"Agregar a pantalla de inicio"**
4. Toca **"Agregar"**

## 🔑 Contraseña de acceso
```
learnscope2026
```

## 🗄️ Tablas Supabase requeridas

Ejecuta este SQL en el Editor SQL de tu proyecto **"Agenda Tecnología"**:

```sql
CREATE TABLE IF NOT EXISTS ls_estudiantes (
  id bigserial PRIMARY KEY,
  codigo text NOT NULL, nombre text NOT NULL,
  grupo text, grado text, periodo text NOT NULL,
  pr_general numeric, nota_tec numeric,
  asignatura_tec text, areas_perdidas integer,
  areas_data jsonb, created_at timestamptz DEFAULT now(),
  UNIQUE(codigo, periodo)
);
CREATE TABLE IF NOT EXISTS ls_seguimientos (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  codigo text NOT NULL, nombre text, texto text NOT NULL,
  created_at timestamptz DEFAULT now()
);
CREATE TABLE IF NOT EXISTS ls_diversity (
  id bigserial PRIMARY KEY, codigo text UNIQUE NOT NULL,
  nombre text NOT NULL, curso text, categoria text,
  created_at timestamptz DEFAULT now()
);
CREATE TABLE IF NOT EXISTS ls_diversity_notas (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  codigo text NOT NULL, nombre text, texto text NOT NULL,
  created_at timestamptz DEFAULT now()
);
CREATE TABLE IF NOT EXISTS ls_categorias (
  id bigserial PRIMARY KEY, nombre text UNIQUE NOT NULL,
  created_at timestamptz DEFAULT now()
);
INSERT INTO ls_categorias (nombre) VALUES
  ('Necesidades de aprendizaje'), ('Talento deportivo'),
  ('Talento académico'), ('Talento en ciencias y tecnología'),
  ('Pendiente diagnóstico')
ON CONFLICT (nombre) DO NOTHING;
ALTER TABLE ls_estudiantes DISABLE ROW LEVEL SECURITY;
ALTER TABLE ls_seguimientos DISABLE ROW LEVEL SECURITY;
ALTER TABLE ls_diversity DISABLE ROW LEVEL SECURITY;
ALTER TABLE ls_diversity_notas DISABLE ROW LEVEL SECURITY;
ALTER TABLE ls_categorias DISABLE ROW LEVEL SECURITY;
```
