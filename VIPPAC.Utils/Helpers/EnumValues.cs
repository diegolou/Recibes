namespace VIPPAC.Utils.Helpers
{
    using System;
    using System.ComponentModel;
    using System.Reflection;

    /// <summary>
    /// Enum Values.
    /// </summary>
    public static class EnumValues
    {
        /// <summary>
        /// Get value from description.
        /// </summary>
        /// <typeparam name="T">T.</typeparam>
        /// <param name="description">description.</param>
        /// <returns>returns.</returns>
        public static T GetValueFromDescription<T>(string description)
        {
            var type = typeof(T);
            if (!type.IsEnum)
            {
                throw new InvalidOperationException();
            }

            foreach (var field in type.GetFields())
            {
                if (Attribute.GetCustomAttribute(field,
                    typeof(DescriptionAttribute)) is DescriptionAttribute attribute)
                {
                    if (attribute.Description == description)
                    {
                        return (T)field.GetValue(null);
                    }
                }
                else
                {
                    if (field.Name == description)
                    {
                        return (T)field.GetValue(null);
                    }
                }
            }
            throw new ArgumentException("Not found.", "description");
        }

        /// <summary>
        /// Get description from value.
        /// </summary>
        /// <param name="valor">valor.</param>
        /// <returns>returns.</returns>
        public static string GetDescriptionFromValue(this Enum valor)
        {
            if (valor != null)
            {
                FieldInfo enumInfo = valor.GetType().GetField(valor.ToString());
                return !(Attribute.GetCustomAttribute(enumInfo, typeof(DescriptionAttribute)) is DescriptionAttribute atributoDescripcion) ? valor.ToString() : atributoDescripcion.Description;
            }

            return string.Empty;
        }
    }
}