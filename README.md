# Un Detalle Para Ti 🌻

Una aplicación web interactiva con carta desplegable, jardín de girasoles y reproductor musical.

## 🚀 Cómo subir este proyecto a GitHub

Si estás subiendo este proyecto a un nuevo repositorio en GitHub por primera vez, ejecuta estos comandos en tu terminal local dentro de la carpeta del proyecto:

```bash
# 1. Inicializar git si aún no está inicializado
git init

# 2. Agregar todos los archivos
git add .

# 3. Crear el primer commit
git commit -m "Initial commit - Un Detalle Para Ti"

# 4. Asegurar que la rama principal se llame main
git branch -M main

# 5. Conectar con tu repositorio de GitHub (reemplaza con tu URL)
git remote add origin https://github.com/TU_USUARIO/TU_REPOSITORIO.git

# 6. Subir el código
git push -u origin main
```

---

## 🛠️ Solución a errores comunes

### 1. `error: remote origin already exists`
Si ya habías agregado el enlace remoto antes o cambiaste de repositorio:
```bash
git remote set-url origin https://github.com/TU_USUARIO/TU_REPOSITORIO.git
```

### 2. `Updates were rejected because the remote contains work that you do not have locally` (o `fetch first`)
Pasa cuando creaste el repositorio en GitHub marcando "Add a README file" o "Add .gitignore":
```bash
# Opción A (Recomendada si el repo remoto está vacío salvo por el README inicial):
git pull origin main --allow-unrelated-histories --no-rebase
git push origin main

# Opción B (Sobrescribir el repo remoto con tu código actual):
git push -f origin main
```

### 3. `error: src refspec main does not match any`
Ocurre si intentas hacer `git push` antes de hacer el primer commit:
```bash
git add .
git commit -m "Primer commit"
git push -u origin main
```

### 4. `Support for password authentication was removed`
GitHub ya no acepta tu contraseña de cuenta para `git push`. Debes usar un **Personal Access Token (PAT)** o SSH:
1. En GitHub ve a: **Settings** > **Developer Settings** > **Personal access tokens** > **Tokens (classic)**.
2. Genera un nuevo token con permisos `repo` y `workflow`.
3. Cuando la terminal te pida tu contraseña, pega el token generado en lugar de tu contraseña.

---

## 🌐 Publicación automática en GitHub Pages

Este proyecto ya incluye el flujo automatizado en `.github/workflows/deploy.yml`.

Para activarlo en GitHub:
1. Ve a tu repositorio en GitHub.
2. Haz clic en **Settings** (Configuración) > **Pages** en la barra lateral izquierda.
3. En **Build and deployment** > **Source**, cambia de *"Deploy from a branch"* a **"GitHub Actions"**.
4. ¡Listo! Cada vez que hagas `git push` a `main`, la página se compilará y publicará automáticamente.
