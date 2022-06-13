namespace VIPPAC.Utils.Helpers
{
    using System;
    using System.Text;

    /// <summary>
    /// Clase que se enciarga de generar codigos aleatorios
    /// </summary>
    public class CodeGenerator
    {
        /// <summary>
        /// Función que genera el codigo aleatorio
        /// </summary>
        /// <param name="size">Tamaño del codigo</param>
        /// <returns>Codigo generado</returns>
        public static string GetCode(int size)
        {
            string numbers = "0123456789";
            Random random = new Random();
            StringBuilder builder = new StringBuilder(size);

            for (var i = 0; i < 6; i++)
            {
                builder.Append(numbers[random.Next(0, numbers.Length)]);
            }
            return builder.ToString();
        }
    }
}