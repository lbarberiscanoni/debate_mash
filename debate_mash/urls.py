"""debate_mash URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from matchup import views as matchup_views
from mental_models import views as mental_model_views
from django.conf import settings
from django.conf.urls.static import static


urlpatterns = [
    path("", matchup_views.index),
    path('admin/', admin.site.urls),
    path('matchup/', matchup_views.matchup),
    path('ranking/', matchup_views.ranking),
    path('mental_models/', mental_model_views.index),
    path("search/", matchup_views.search)
] + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
