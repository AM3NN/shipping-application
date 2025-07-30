<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8" />
    <title>Connexion</title>
    <link rel="stylesheet" href="${url.resourcesPath}/css/custom-login.css" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
</head>
<body>
<div class="bg-surface-50 flex items-center justify-center min-h-screen">
    <div class="login-container">
        <div class="login-header">
            <svg viewBox="0 0 54 40" fill="none" xmlns="http://www.w3.org/2000/svg" class="login-logo">
                <path fill-rule="evenodd" clip-rule="evenodd"
                      d="M17.1637 19.2467C17.1566 19.4033 17.1529 19.561 17.1529 19.7194C17.1529 25.3503 21.7203 29.915 27.3546 29.915C32.9887 29.915 37.5561 25.3503 37.5561 19.7194C37.5561 19.5572 37.5524 19.3959 37.5449 19.2355C38.5617 19.0801 39.5759 18.9013 40.5867 18.6994L40.6926 18.6782C40.7191 19.0218 40.7326 19.369 40.7326 19.7194C40.7326 27.1036 34.743 33.0896 27.3546 33.0896C19.966 33.0896 13.9765 27.1036 13.9765 19.7194C13.9765 19.374 13.9896 19.0316 14.0154 18.6927L14.0486 18.6994C15.0837 18.9062 16.1223 19.0886 17.1637 19.2467ZM33.3284 11.4538C31.6493 10.2396 29.5855 9.52381 27.3546 9.52381C25.1195 9.52381 23.0524 10.2421 21.3717 11.4603C20.0078 11.3232 18.6475 11.1387 17.2933 10.907C19.7453 8.11308 23.3438 6.34921 27.3546 6.34921C31.36 6.34921 34.9543 8.10844 37.4061 10.896C36.0521 11.1292 34.692 11.3152 33.3284 11.4538Z"
                      fill="var(--primary-color)" />
            </svg>
            <h2 class="login-title">Bienvenue sur Mon Application</h2>
            <p class="login-subtitle">Connectez-vous pour continuer</p>
        </div>

        <form id="kc-form-login" onsubmit="login.disabled = true; return true;" action="${url.loginAction}" method="post" class="login-form">
            <label for="username" class="form-label">Email</label>
            <input type="text" id="username" name="username" placeholder="Adresse email" autofocus class="form-input" />

            <label for="password" class="form-label">Mot de passe</label>
            <input type="password" id="password" name="password" placeholder="Mot de passe" class="form-input" />

            <div class="form-footer">
                <div>
                    <input type="checkbox" id="rememberMe" name="rememberMe" />
                    <label for="rememberMe" class="checkbox-label">Se souvenir de moi</label>
                </div>
                <a href="#" class="forgot-password">Mot de passe oublié ?</a>
            </div>

            <input type="submit" name="login" id="kc-login" value="Connexion" class="btn-submit" />
        </form>
    </div>
</div>
</body>
</html>
