import { TBike } from './bike.interface';
import { Bike } from './bike.model';

const createBikeIntoDB = async (bike: TBike) => {
  const result = await Bike.create(bike);
  return result;
};
const getAllBikeFromDB = async (query: Record<string, unknown>) => {
  // const filter: Record<string, unknown> = {};
  // const { search, sortBy, ...otherFilters } = query;

  // // Search logic (partial match for title or content)
  // if (search) {
  //   const searchRegex = { $regex: search as string, $options: 'i' };
  //   filter.$or = [
  //     { brand: searchRegex },
  //     { category: searchRegex },
  //     { name: searchRegex },
  //   ];
  // }

  // // Exact match filters
  // Object.keys(otherFilters).forEach((key) => {
  //   if (key === 'author') {
  //     // Convert to ObjectId for author filtering
  //     filter[key] = new mongoose.Types.ObjectId(otherFilters[key] as string);
  //   } else {
  //     filter[key] = { $regex: otherFilters[key], $options: 'i' };
  //   }
  // });

  // // Default sort by newest blogs first

  // const sort = sortBy ? (sortBy as string) : '-createdAt';

  // const result = await Bike.find(filter).sort(sort);
  const filter: Record<string, unknown> = {};
  const { search, sortBy, price, model, brand, category } = query;

  // Search logic (partial match for brand, category, or name)
  if (search) {
    const searchRegex = { $regex: search as string, $options: 'i' };
    filter.$or = [
      { brand: searchRegex },
      { category: searchRegex },
      { name: searchRegex },
    ];
  }

  // Filtering by specific fields
  if (brand) filter.brand = { $regex: brand as string, $options: 'i' };
  if (category) filter.category = { $regex: category as string, $options: 'i' };
  if (model) filter.model = { $regex: model as string, $options: 'i' };

  // Price range filtering
  if (price) {
    const [minPrice, maxPrice] = (price as string).split('-').map(Number);
    if (!isNaN(minPrice) && !isNaN(maxPrice)) {
      filter.price = { $gte: minPrice, $lte: maxPrice };
    }
  }

  // Default sorting by newest bikes first
  const sort = sortBy ? (sortBy as string) : '-createdAt';

  const result = await Bike.find(filter).sort(sort);

  // const result = await Bike.find();
  return result;
};
const getSingleBikeFromDB = async (id: string) => {
  if (await Bike.doesNotBikeExist(id)) {
    throw new Error('product id  does not exist');
  }

  const result = await Bike.findById(id);
  return result;
};
const updateBikeFromDB = async (id: string, data: Partial<TBike>) => {
  if (await Bike.doesNotBikeExist(id)) {
    throw new Error('product id  does not exist');
  }
  const result = await Bike.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });
  return result;
};

const deleteBikeFromDB = async (id: string) => {
  if (await Bike.doesNotBikeExist(id)) {
    throw new Error('this bike id  does not exist');
  }
  const result = await Bike.findByIdAndDelete(id);
  return result;
};
export const BikeServices = {
  createBikeIntoDB,
  getAllBikeFromDB,
  getSingleBikeFromDB,
  updateBikeFromDB,
  deleteBikeFromDB,
};
