class Car {
  constructor({
    id,
    plate,
    manufacture,
    model,
    image,
    rentPerDay,
    capacity,
    description,
    transmission,
    available,
    type,
    year,
    options,
    specs,
    availableAt,
  }) {
    this.id = id;
    this.plate = plate;
    this.manufacture = manufacture;
    this.model = model;
    this.image = image;
    this.rentPerDay = rentPerDay;
    this.capacity = capacity;
    this.description = description;
    this.transmission = transmission;
    this.available = available;
    this.type = type;
    this.year = year;
    this.options = options;
    this.specs = specs;
    this.availableAt = availableAt;
  }
  render() {
    return `
    <div class="flex flex-wrap gap-4 bg-neutral-100 shadow-low rounded-lg p-6 h-[560px] md:h-[550px] xl:h-[560px]">
      <img src="${this.image}" alt="${
      this.image.split("/")[2].split(".")[0]
    }" class="w-full h-2/5 max-h-56 md:max-h-52 xl:max-h-60 object-cover rounded-lg">
      <p class="w-full">${this.manufacture} ${this.model}</p>
      <p class="w-full text-neutral-900 text-sm font-bold">${new Intl.NumberFormat(
        "id-ID",
        {
          style: "currency",
          currency: "IDR",
        }
      ).format(this.rentPerDay)} / hari</p>
      <p class="w-full text-neutral-900 text-sm font-light">${
        this.description
      }</p>
      <div class="w-full gap-2 flex text-sm">
        <img src="./images/fi_users.svg" alt="capacity">
        <p>${this.capacity} orang</p>
      </div>
      <div class="w-full gap-2 flex text-sm">
        <img src="./images/fi_settings.svg" alt="transmission">
        <p>${this.transmission}</p>
      </div>
      <div class="w-full gap-2 flex text-sm">
        <img src="./images/fi_calendar.svg" alt="year">
        <p>Tahun ${this.year}</p>
      </div>
      <a href="#" class="w-full px-3 py-2 rounded-sm font-bold text-sm text-neutral-100 bg-limegreen-700 text-center">Pilih Mobil</a>
    </div>
    `;
  }
}

export default Car;
