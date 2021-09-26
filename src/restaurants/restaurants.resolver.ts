import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { Restaurant } from "./entities/restaurant.entity";
import { CreateRestaurantDto } from "./dto/create-restaurant.dto";
import { RestaurantsService } from "./restaurants.service";
import { UpdateRestaurantDto } from "./dto/update-restaurant.dto";


@Resolver(of => Restaurant)
export  class RestaurantsResolver {
  constructor(private readonly restaurantService: RestaurantsService) {}
  @Query(() => Restaurant)
  myRestaurant() {
    return true;
  }
  @Query(() => [Restaurant])
  restaurants(@Args('veganOnly') veganOnly: boolean): Promise<Restaurant[]> {
    console.log(veganOnly);
    return this.restaurantService.getAll();
  }
  @Mutation(returns => Boolean)
  async createRestaurant(
    @Args('input') createRestaurantDto: CreateRestaurantDto,
  ): Promise<boolean> {
    try {
      await this.restaurantService.createRestaurant(createRestaurantDto);
      return true;
    }catch(err) {
      console.log(err);
      return false
    }
  }
  @Mutation(returns => Boolean)
  async updateRestaurant(@Args('input') updateRestaurantDto: UpdateRestaurantDto): Promise<boolean> {
    try {
      await this.restaurantService.updateRestaurant(updateRestaurantDto);
      return true
    } catch(e) {
      console.log(e);
      return false
    }
  }
}