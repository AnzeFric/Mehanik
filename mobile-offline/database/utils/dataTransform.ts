import { CustomerFormData } from "@/interfaces/customer";

export const transformToCustomerFormData = async (
  customer: CustomerFormData
) => {
  return {
    uuid: customer.uuid,
    customer: {
      firstName: customer.customer.firstName,
      lastName: customer.customer.lastName,
      email: customer.customer.email,
      phone: customer.customer.phone,
    },
    vehicle: {
      brand: customer.vehicle.brand,
      model: customer.vehicle.model,
      buildYear: customer.vehicle.buildYear,
      vin: customer.vehicle.vin,
      image: customer.vehicle.image,
      description: customer.vehicle.description,
    },
    repair: customer.repair?.map((repair) => ({
      uuid: repair.uuid,
      type: repair.type,
      price: repair.price,
      date: new Date(repair.date),
      options: repair.options,
      description: repair.description,
      images: repair.images,
      note: repair.note,
    })),
  };
};
