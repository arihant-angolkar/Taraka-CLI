def find_largest_in_array(arr):
    """
    Finds the largest element in a given array.

    Args:
        arr: A list of numbers.

    Returns:
        The largest number in the array.
        Returns None if the array is empty.
    """
    if not arr:
        return None  # Handle empty array case

    largest = arr[0]
    for element in arr:
        if element > largest:
            largest = element
    return largest

if __name__ == "__main__":
    # Example usage
    my_array1 = [3, 1, 4, 1, 5, 9, 2, 6]
    print(f"The largest element in {my_array1} is: {find_largest_in_array(my_array1)}")

    my_array2 = [-10, -5, -20, -3]
    print(f"The largest element in {my_array2} is: {find_largest_in_array(my_array2)}")

    my_array3 = [7]
    print(f"The largest element in {my_array3} is: {find_largest_in_array(my_array3)}")

    my_array4 = []
    print(f"The largest element in {my_array4} is: {find_largest_in_array(my_array4)}")

    my_array5 = [5.5, 2.1, 9.8, 1.0]
    print(f"The largest element in {my_array5} is: {find_largest_in_array(my_array5)}")