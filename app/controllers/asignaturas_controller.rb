class AsignaturasController < ApplicationController

    @asignatura = Asignatura.find(params[:id])
end
