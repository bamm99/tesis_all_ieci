class SemestresController < ApplicationController
    before_action :set_semestre, only: [:show, :edit, :update, :destroy]
  
    # GET /semestres
    def index
      @semestres = Semestre.all
    end
  
    # otros métodos como 'new', 'create', 'show', 'edit', 'update', 'destroy'
  end