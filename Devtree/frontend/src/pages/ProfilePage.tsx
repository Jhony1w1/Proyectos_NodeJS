import { useForm } from "react-hook-form";
import ErrorMessage from "../components/ErrorMessage";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { ProfileForm, User } from "../types";
import { updateProfile, uploadImage } from "../api/DevTreeAPI";
import { toast } from "sonner";
import { ChangeEvent } from "react";

const ProfilePage = () => {
  // Obtener info de datos cacheados
  const queryCliente = useQueryClient();
  const data = queryCliente.getQueryData<User>(["user"])!;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProfileForm>({
    defaultValues: {
      handle: data.handle,
      description: data.description,
    },
  });

  const updateProfileMutation = useMutation({
    mutationFn: updateProfile,
    onError: (err) => {
      // console.log('Hubo un error', err);
      toast.error(err.message);
    },
    onSuccess: (res) => {
      toast.success(res?.data);
      // console.log('Todo bien', res);
      queryCliente.invalidateQueries({ queryKey: ["user"] }); // eliminar datos cacheados
    },
  });

  const uploadImageMutation = useMutation({
    mutationFn: uploadImage,
    onError: (err) => {
      toast.error(err.message);
    },
    onSuccess: (data) => {
      toast.success("imagen subida correctamente");
      queryCliente.setQueryData(["user"], (prevData: User) => {
        return {
          ...prevData,
          image: data.image
        }
        
      }) // eliminar datos cacheados
    },
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      //console.log(e.target.files[0]);
      uploadImageMutation.mutate(e.target.files[0]);
    }
  };

  const onSubmit = (formData: ProfileForm) => {
    updateProfileMutation.mutate(formData);
  };

  return (
    <form
      className="bg-white p-10 rounded-lg space-y-5"
      onSubmit={handleSubmit(onSubmit)}
    >
      <legend className="text-2xl text-slate-800 text-center">
        Editar Información
      </legend>
      <div className="grid grid-cols-1 gap-2">
        <label htmlFor="handle">Handle:</label>
        <input
          type="text"
          className="border-none bg-slate-100 rounded-lg p-2"
          placeholder="handle o Nombre de Usuario"
          {...register("handle", {
            required: "El nombre de usuario es obligatorio",
          })}
        />

        {errors.handle && <ErrorMessage>{errors.handle.message}</ErrorMessage>}
      </div>

      <div className="grid grid-cols-1 gap-2">
        <label htmlFor="description">Descripción:</label>
        <textarea
          className="border-none bg-slate-100 rounded-lg p-2"
          placeholder="Tu Descripción"
          {...register("description", {
            required: "La descripción es obligatoria",
          })}
        />

        {errors.description && (
          <ErrorMessage>{errors.description.message}</ErrorMessage>
        )}
      </div>

      <div className="grid grid-cols-1 gap-2">
        <label htmlFor="handle">Imagen:</label>
        <input
          id="image"
          type="file"
          name="handle"
          className="border-none bg-slate-100 rounded-lg p-2"
          accept="image/*"
          onChange={handleChange}
        />
      </div>

      <input
        type="submit"
        className="bg-cyan-400 p-2 text-lg w-full uppercase text-slate-600 rounded-lg font-bold cursor-pointer"
        value="Guardar Cambios"
      />
    </form>
  );
};

export default ProfilePage;
