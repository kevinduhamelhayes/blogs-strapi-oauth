/**
 * Envía un evento a Google Analytics
 * @param action Nombre del evento
 * @param params Parámetros adicionales del evento
 */
export const sendGAEvent = (action: string, params = {}) => {
  if (typeof window !== 'undefined' && 'gtag' in window) {
    // Obtenemos el ID de usuario de Supabase si está disponible
    let userData = {};
    try {
      const storedUser = localStorage.getItem('supabase-user');
      if (storedUser) {
        const user = JSON.parse(storedUser);
        userData = {
          user_id: user.id,
          user_email: user.email,
        };
      }
    } catch (error) {
      console.error('Error al obtener datos de usuario:', error);
    }

    // Combinamos los parámetros del usuario con los parámetros del evento
    const combinedParams = {
      ...userData,
      ...params,
    };

    // Enviamos el evento a GA
    window.gtag('event', action, combinedParams);
  }
};

/**
 * Eventos comunes
 */
export const gaEvents = {
  // Autenticación
  LOGIN: 'login',
  LOGOUT: 'logout',
  
  // Interacción con el blog
  VIEW_POST: 'view_post',
  CLICK_POST_LINK: 'click_post_link',
  CLICK_TAG_LINK: 'click_tag_link',
  
  // Navegación
  CLICK_NAV_LINK: 'click_nav_link',
  
  // Carrusel
  CAROUSEL_INTERACTION: 'carousel_interaction',
  
  // Desplazamiento
  SCROLL_DEPTH_SECTION: 'scroll_depth_section',
  
  // Tema
  THEME_TOGGLE: 'theme_toggle',
  
  // Términos
  ACCEPT_TERMS: 'accept_terms',
};

/**
 * Configuración del seguimiento de desplazamiento
 * @param elementId ID del elemento a rastrear
 */
export const setupScrollTracking = (elementId: string) => {
  if (typeof window === 'undefined') return;

  const element = document.getElementById(elementId);
  if (!element) return;

  const checkScroll = () => {
    const viewportHeight = window.innerHeight;
    const elementHeight = element.offsetHeight;
    const scrollTop = window.scrollY;
    const elementTop = element.offsetTop;
    
    // Calcula el porcentaje de desplazamiento
    const scrollPercentage = Math.min(
      100,
      Math.round(((scrollTop - elementTop + viewportHeight) / elementHeight) * 100)
    );
    
    // Define los umbrales de desplazamiento a rastrear
    const thresholds = [25, 50, 75, 90];
    
    // Verifica si se ha alcanzado algún umbral
    thresholds.forEach(threshold => {
      if (scrollPercentage >= threshold && !element.dataset[`scrolled${threshold}`]) {
        // Marca este umbral como alcanzado
        element.dataset[`scrolled${threshold}`] = 'true';
        
        // Envía el evento a GA
        sendGAEvent(gaEvents.SCROLL_DEPTH_SECTION, {
          element_id: elementId,
          scroll_percentage: threshold,
          page_path: window.location.pathname,
        });
      }
    });
  };

  // Configura el detector de desplazamiento
  window.addEventListener('scroll', checkScroll, { passive: true });
}; 