import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

// 1. Создаем схему валидации через Zod
const productSchema = z.object({
  name: z.string().min(3, "Название должно быть не короче 3 символов"),
  price: z.coerce.number().positive("Цена должна быть больше 0"), // coerce переводит строку в число
  category: z.enum(["одежда", "обувь", "аксессуары"]), // Разрешаем только эти три значения
});

// 2. Вытаскиваем TypeScript-тип из схемы Zod
type ProductFormData = z.infer<typeof productSchema>;

interface AddProductFormProps {
  onAdd: (data: ProductFormData) => void;
}

function AddProductForm({ onAdd }: AddProductFormProps) {
  // 3. Инициализируем форму
  const {
    register,       // функция для привязки инпутов
    handleSubmit,   // функция для отправки (проверяет данные)
    formState: { errors }, // объект с ошибками
    reset,          // функция для очистки формы
  } = useForm<ProductFormData>({
    resolver: zodResolver(productSchema) as any, // Говорим использовать Zod для проверки
  });

  // 4. Эта функция сработает ТОЛЬКО если Zod пропустил данные
  const onSubmit = (data: ProductFormData) => {
    onAdd(data); // Передаем данные наверх (в Home.tsx)
    reset();     // Очищаем форму
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="shop-form">
      <div>
        <input
          type="text"
          placeholder="Название продукта"
          {...register("name")} // Привязываем поле к схеме
        />
        {errors.name && <p className="error-text">{errors.name.message}</p>}
      </div>

      <div>
        <input
          type="number"
          placeholder="Цена"
          {...register("price")}
        />
        {errors.price && <p className="error-text">{errors.price.message}</p>}
      </div>

      <div>
        <select {...register("category")}>
          <option value="одежда">Одежда</option>
          <option value="обувь">Обувь</option>
          <option value="аксессуары">Аксессуары</option>
        </select>
        {errors.category && <p className="error-text">{errors.category.message}</p>}
      </div>

      <button type="submit" className="addProduct">Добавить</button>
    </form>
  );
}

export default AddProductForm;